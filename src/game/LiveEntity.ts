/// <reference path="statuseffect.ts" />
/// <reference path="ability.ts" />
/// <reference path="../engine/vector2d.ts" />



class LiveEntity implements Updateable {
  move: Vector2D;

  statusEffects: StatusEffect[];

  abilities: { [id: string] : Ability };
  target: LiveEntity;

  castingAbility: AbilityInstance;
  accMove: AcceleratedMovement;

  constructor(public name: string, private pos: Vector2D, public face: number,
    public range: number, public speed: number, public size: number, public color: string) {
    this.move = new Vector2D(0, 0);
    this.statusEffects = [];
    this.abilities = {};
    this.accMove = null;
    this.castingAbility = null;
  }

  update(delta: number) {
    if (this.castingAbility) {
      var isDone = this.castingAbility.update(delta);
      if (isDone) this.castingAbility = null;
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

  // Attempt to cast the ability.
  // Returns false if entity is already casting, it has no target or target is out of range
  castAbility(abilityInstance: AbilityInstance): boolean {
    if (!this.castingAbility && abilityInstance && this.target && this.pos.distanceTo(this.target.pos) <= abilityInstance.getRange()) {
      this.castingAbility = abilityInstance;
      return true;
    }
    return false;
  }

  cancelCast(): void {
    if (this.castingAbility) {
      this.castingAbility = null;
    }
  }
}


interface AcceleratedMovement {
  dir: Vector2D;
  vel: number;
  acc: number;
}