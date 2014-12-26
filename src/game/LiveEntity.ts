/// <reference path="statuseffect.ts" />
/// <reference path="ability.ts" />
/// <reference path="../engine/vector2d.ts" />



class LiveEntity implements Updateable {
  move: Vector2D;

  statusEffects: StatusEffect[];
  
  abilities: Ability[];
  target: LiveEntity;

  accMove: AcceleratedMovement;

  constructor(private pos: Vector2D, public face: number,
    public range: number, public speed: number, public size: number, public color: string) {
    this.move = new Vector2D(0, 0);
    this.statusEffects = [];
    this.abilities = [];
    this.accMove = null;
  }

  update(delta: number) {
    if (this.accMove) {
      this.pos.moveInDir(this.accMove.dir, this.accMove.vel * delta);
      this.accMove.vel += this.accMove.acc;
      if (this.accMove.vel < 0) this.accMove = null;

    } else if (this.move.x || this.move.y) {
      this.pos.moveInDir(this.move, Math.min(this.move.length(), this.speed * delta));
    }
  }

  draw(context: CanvasRenderingContext2D) {
    fillCircleWithFace(context, this.pos.x, this.pos.y, this.size, this.color, this.face);
  }

  getPos(): Vector2D {
    return this.pos;
  }
}

interface AcceleratedMovement {
  dir: Vector2D;
  vel: number;
  acc: number;
}