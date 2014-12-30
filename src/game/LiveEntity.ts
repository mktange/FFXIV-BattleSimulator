/// <reference path="statuseffect.ts" />
/// <reference path="ability.ts" />
/// <reference path="../engine/vector2d.ts" />



class LiveEntity implements Updateable {
  move: Vector2D;

  statusEffects: StatusEffect[];

  abilities: { [id: string] : Ability };
  target: LiveEntity;

  activeAbility: AbilityInstance;
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
    if (this.activeAbility) {
      var isDone = this.activeAbility.update(delta);
      if (isDone) this.activeAbility = null;
    }

    this.calcMove(delta);
    if (this.move.x || this.move.y) {
      this.pos.add(this.move);
      this.face = this.move.getAngle();
      this.move.x = 0;
      this.move.y = 0;
    }
  }

  private calcMove(delta: number) {
    if (this.accMove) {
      this.move.setTo(this.accMove.dir);
      this.move.toSize(this.accMove.vel * delta);

      this.accMove.vel += this.accMove.acc;
      if (this.accMove.vel <= 0) this.accMove = null;
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
      this.activeAbility = ability.createInstance(this, engine);
      return true;
    }
    return false;
  }

  cancelCast(): void {
    if (this.activeAbility) {
      this.activeAbility = null;
    }
  }
}


interface AcceleratedMovement {
  dir: Vector2D;
  vel: number;
  acc: number;
}