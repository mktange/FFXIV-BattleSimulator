/// <reference path="vector2d.ts" />


class Rectangle {
  private A: Vector2D;
  private B: Vector2D
  private C: Vector2D;

  static fromLineOrigin(origin: Vector2D, direction: number, width: number, length: number) {
    var v1 = Vector2D.unitFromAngle(direction).toSize(length);
    var v2 = v1.getNormal().toSize(width);

    var halfWidth = Vector2D.scale(v2, 0.5);
    var rect = new Rectangle();
    rect.A = Vector2D.subtract(origin, halfWidth);
    rect.B = Vector2D.add(rect.A, v1);
    rect.C = Vector2D.add(rect.A, v2);
    return rect;
  }

  contains(pos: Vector2D) {
    var AB = Vector2D.subtract(this.B, this.A);
    var AC = Vector2D.subtract(this.C, this.A);
    if ((pos.x - this.A.x) * AB.x + (pos.y - this.A.y) * AB.y < 0) return false;
    if ((pos.x - this.B.x) * AB.x + (pos.y - this.B.y) * AB.y > 0) return false;
    if ((pos.x - this.A.x) * AC.x + (pos.y - this.A.y) * AC.y < 0) return false;
    if ((pos.x - this.C.x) * AC.x + (pos.y - this.C.y) * AC.y > 0) return false;

    return true;
  }
}