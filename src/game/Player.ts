/// <reference path="liveentity.ts" />
/// <reference path="entity.ts" />
/// <reference path="../engine/drawingutils.ts" />



class Player extends LiveEntity implements IEntity {

  constructor(public pos: Vector2D, public face: number, public range: number, public speed: number) {
    super(pos, face, range, speed);
  }

  update(delta: number) {
    var dX = 0, dY = 0;
    if (inputEngine.actions['move-up']) dY -= 1;
    if (inputEngine.actions['move-down']) dY += 1;
    if (inputEngine.actions['move-left']) dX -= 1;
    if (inputEngine.actions['move-right']) dX += 1;
    var dir = new Vector2D(dX, dY);
    if (dX || dY) {
      this.face = dir.getAngle();
      this.pos.moveInDir(dir, this.speed * delta);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    fillCircleWithFace(context, this.pos.x, this.pos.y, 10, "blue", this.face);
  }
}
