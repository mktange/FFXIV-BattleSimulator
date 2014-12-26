/// <reference path="liveentity.ts" />
/// <reference path="updateable.ts" />
/// <reference path="enemytype.ts" />


class Enemy extends LiveEntity implements Updateable {

  constructor(enemyType: EnemyType, pos: Vector2D, face: number) {
    super(pos, face, enemyType.range, enemyType.speed, enemyType.size, "orange");
  }

  update(delta: number): void {
    if (this.target === undefined || this.target === null) return;

    var myPos = this.getPos();
    var tPos = this.target.getPos();

    this.face = myPos.angleTo(tPos);
    var diff = myPos.getDiff(tPos);
    var dist = diff.length() - this.range;
    if (dist > 0) {
      this.move = diff.toSize(Math.min(dist, this.speed * delta));
    } else {
      this.move.x = 0;
      this.move.y = 0;
    }
    super.update(delta);
  }

  draw(context: CanvasRenderingContext2D): void {
    super.draw(context);
  }
}