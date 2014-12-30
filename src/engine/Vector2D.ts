
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

  toUnit(): void {
    var len = this.length();
    this.x /= len;
    this.y /= len;
  }

  getUnit(): Vector2D {
    var len = this.length();
    return new Vector2D(this.x / len, this.y / len);
  }

  getUnitDirection(other: Vector2D): Vector2D {
    var vec = this.getDiff(other);
    vec.toUnit();
    return vec;
  }

  moveTowards(other: Vector2D, distance: number): void {
    var unit = this.getUnitDirection(other);
    this.x += unit.x * distance;
    this.y += unit.y * distance;
  }

  moveInDir(dir: Vector2D, distance: number): void {
    var unit = dir.getUnit();
    this.x += unit.x * distance;
    this.y += unit.y * distance;
  }

  add(other: Vector2D): void {
    this.x += other.x;
    this.y += other.y;
  }

  subtract(other: Vector2D): void {
    this.x -= other.x;
    this.y -= other.y;
  }

  scale(factor: number): void {
    this.x *= factor;
    this.y *= factor;
  }

  static add(v1: Vector2D, v2: Vector2D): Vector2D {
    return new Vector2D(v1.x + v2.x, v1.y + v2.y);
  }

  static subtract(v1: Vector2D, v2: Vector2D): Vector2D {
    return new Vector2D(v1.x - v2.x, v1.y - v2.y);
  }

  static scale(v1: Vector2D, factor: number): Vector2D {
    return new Vector2D(v1.x * factor, v1.y * factor);
  }

  toSize(size: number): Vector2D {
    this.toUnit();
    this.scale(size);
    return this;
  }

  angleTo(other: Vector2D): number {
    return Math.atan2(other.x - this.x, other.y - this.y);
  }

  getNormal(): Vector2D {
    return new Vector2D(-this.y, this.x);
  }

  setTo(other: Vector2D) {
    this.x = other.x;
    this.y = other.y;
  }
}
