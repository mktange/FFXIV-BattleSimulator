/// <reference path="statuseffect.ts" />
/// <reference path="ability.ts" />



class LiveEntity implements Updateable {
  move: Vector2D;

  statusEffects: StatusEffect[];

  abilities: { [id: string] : Ability };
  target: LiveEntity;

  activeAbility: ActiveAbility;

  accMove: AcceleratedMovement;

  constructor(private pos: Vector2D, public face: number,
    public range: number, public speed: number, public size: number, public color: string) {
    this.move = new Vector2D(0, 0);
    this.statusEffects = [];
    this.abilities = {};
    this.accMove = null;
    this.activeAbility = null;
  }

  update(delta: number) {
    var distance: number;
    if (this.accMove) {
      this.move = this.accMove.dir;
      distance = this.accMove.vel * delta;

      this.accMove.vel += this.accMove.acc;
      if (this.accMove.vel <= 0) this.accMove = null;

    } else {
      distance = Math.min(this.move.length(), this.speed * delta);
    }

    if (this.move.x || this.move.y) {
      this.cancelActiveAbility();
      this.pos.moveInDir(this.move, distance);

    } else if (this.activeAbility) {
      this.activeAbility.spentTime += delta;
      if (this.activeAbility.spentTime >= this.activeAbility.ability.castTime) {
        this.activeAbility.ability.castEnd(this.activeAbility.engine);
        this.activeAbility = null;
      }
    }
  }

  draw(context: CanvasRenderingContext2D) {
    fillCircleWithFace(context, this.pos.x, this.pos.y, this.size, this.color, this.face);
  }

  getPos(): Vector2D {
    return this.pos;
  }

  useAbility(name: string, engine: BattleEngine): boolean {
    var ability = this.abilities[name];

    if (ability && this.target && this.pos.distanceTo(this.target.pos) <= ability.range) {
      ability.castStart(this, engine);
      this.activeAbility = {
        ability: ability,
        spentTime: 0,
        engine: engine,
      }
      return true;
    }
    return false;
  }

  private cancelActiveAbility(): void {
    this.activeAbility = null;
  }
}

interface ActiveAbility {
  ability: Ability;
  spentTime: number;
  engine: BattleEngine;
}

interface AcceleratedMovement {
  dir: Vector2D;
  vel: number;
  acc: number;
}