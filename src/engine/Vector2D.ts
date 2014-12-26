
class Vector2D {
  constructor(public x: number, public y: number) { }

  static unitFromAngle(angle: number) {
    return new Vector2D(Math.sin(angle), Math.cos(angle));
  }

  static unitFromXY(x: number, y: number) {
    return (new Vector2D(x, y)).toUnit();
  }

  length(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  getAngle(): number {
    return Math.atan2(this.x, this.y);
  }

  getDiff(other: Vector2D): Vector2D {
    return new Vector2D(other.x - this.x, other.y - this.y);
  }

  distanceTo(other: Vector2D): number {
    return this.getDiff(other).length();
  }

  toUnit(): Vector2D {
    var len = this.length();
    return new Vector2D(this.x / len, this.y / len);
  }

  getUnitDirection(other: Vector2D): Vector2D {
    return this.getDiff(other).toUnit();
  }

  moveTowards(other: Vector2D, distance: number): void {
    var unit = this.getUnitDirection(other);
    this.x += unit.x * distance;
    this.y += unit.y * distance;
  }

  moveInDir(dir: Vector2D, distance: number): void {
    var unit = dir.toUnit();
    this.x += unit.x * distance;
    this.y += unit.y * distance;
  }

  toSize(size: number): Vector2D {
    var unit = this.toUnit();
    unit.x *= size;
    unit.y *= size;
    return unit;
  }

  angleTo(other: Vector2D): number {
    return Math.atan2(other.x - this.x, other.y - this.y);
  }

  normal(): Vector2D {
    return new Vector2D(-this.y, this.x);
  }
}
