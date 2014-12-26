/// <reference path="liveentity.ts" />
/// <reference path="../engine/drawingutils.ts" />
/// <reference path="entity.ts" />


class Enemy extends LiveEntity implements IEntity {

  constructor(public pos: Vector2D, public face: number, public range: number, public speed: number) {
    super(pos, face, range, speed);
  }

  update(delta: number): void {
    if (this.target === undefined) return;

    this.face = this.pos.angleTo(this.target.pos);
    var dist = this.pos.distanceTo(this.target.pos) - this.range;
    if (dist > 0) {
      this.pos.moveTowards(this.target.pos, Math.min(dist, this.speed * delta));
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    fillCircleWithFace(context, this.pos.x, this.pos.y, 15, "red", this.face);
  }
}