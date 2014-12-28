/// <reference path="vector2d.ts" />


class Rectangle {
  private A: Vector2D;
  private B: Vector2D
  private C: Vector2D;

  static fromLineOrigin(origin: Vector2D, direction: number, width: number, length: number) {
    var v1 = Vector2D.unitFromAngle(direction).toSize(length);
    var v2 = v1.normal().toSize(width);

    var halfWidth = v2.scale(0.5);
    var rect = new Rectangle();
    rect.A = origin.subtract(halfWidth);
    rect.B = rect.A.add(v1);
    rect.C = rect.A.add(v2);
    return rect;
  }

  contains(pos: Vector2D) {
    var AB = this.B.subtract(this.A);
    var AC = this.C.subtract(this.A);
    if ((pos.x - this.A.x) * AB.x + (pos.y - this.A.y) * AB.y < 0) return false;
    if ((pos.x - this.B.x) * AB.x + (pos.y - this.B.y) * AB.y > 0) return false;
    if ((pos.x - this.A.x) * AC.x + (pos.y - this.A.y) * AC.y < 0) return false;
    if ((pos.x - this.C.x) * AC.x + (pos.y - this.C.y) * AC.y > 0) return false;

    return true;
  }
}