/// <reference path="vector2d.ts" />

function fillCircle(x: number, y: number, radius: number, color: string) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
}

function fillCircleWithFace(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, face: number) {
  fillCircle(x, y, radius, color);
  var unit = Vector2D.unitFromAngle(face);
  
  context.beginPath();
  context.moveTo(x - unit.y * radius, y + unit.x * radius);
  context.lineTo(x + unit.x * radius * 1.5, y + unit.y * radius * 1.5);
  context.lineTo(x + unit.y * radius, y - unit.x * radius);
  context.closePath();
  context.fill();
}