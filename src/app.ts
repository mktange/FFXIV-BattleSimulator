/// <reference path="engine/inputengine.ts" />
/// <reference path="game/enemy.ts" />
/// <reference path="game/player.ts" />

var posX = 0;
var posY = 0;
var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;
var debug: HTMLSpanElement;
var lastTime = -1;

var inputEngine: InputEngine;
var player: Player = new Player(new Vector2D(500, 500), 0, 40, 200/1000);
var enemy: Enemy = new Enemy(new Vector2D(10,10), 0, 40, 210/1000);
enemy.target = player;

window.onload = () => {
  debug = document.createElement("div");
  debug.style.clear = "both";
  document.getElementById("content").appendChild(debug);

  canvas = initCanvas();
  context = canvas.getContext("2d");
  
  mainLoop(render);
};

function mainLoop(render: (number) => boolean): void {
  var running = true;
  var lastTime = 0;

  function loop(time: number): void {
    if (running) {
      requestAnimationFrame(loop);
      running = render(time - lastTime);
      lastTime = time;
    }
  }
  requestAnimationFrame(loop);
}

function render(delta: number): boolean {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update(delta);
  enemy.update(delta);
  player.draw(context);
  enemy.draw(context);
  return true;
}


function initCanvas(): HTMLCanvasElement {
  var canvas = document.createElement("canvas");

  canvas.id = "canvas";
  canvas.width = 1000;
  canvas.height = 768;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";
  canvas.tabIndex = 1;
  canvas.addEventListener('click', function (event) {
    player.pos.x = event.pageX - canvas.offsetLeft;
    player.pos.y = event.pageY - canvas.offsetTop;
  });
  inputEngine = new InputEngine(canvas);
  
  document.getElementById("content").appendChild(canvas);
  return canvas;
}