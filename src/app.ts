﻿/// <reference path="engine/inputengine.ts" />
/// <reference path="game/enemy.ts" />
/// <reference path="game/player.ts" />
/// <reference path="engine/battleengine.ts" />

var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

var debug: HTMLSpanElement;
var speed: HTMLInputElement;
var deacc: HTMLInputElement;

var inputEngine: InputEngine;
var fps = 0;


var battleEngine = new BattleEngine();
var player = battleEngine.addPlayer(Job.WAR, new Vector2D(500, 500), 0);

battleEngine.setControlablePlayer(player);
battleEngine.addPlayer(Job.BLM, new Vector2D(800, 500), 0);
//battleEngine.addPlayer(Job.WHM, new Vector2D(200, 500), 0);


var enemyType = new EnemyType("Nael", 210 / 1000, 15, 40);
var enemy = battleEngine.addEnemy(enemyType, new Vector2D(500, 100), 0);
enemy.target = player;

var chargeMechanics = <AbilityMechanics>{};
chargeMechanics.getTargets = function (caster, engine) {
  var possibleTargets = engine.getPlayers().filter(p => {
    return p != caster.target && p.job != Job.WAR && p.job != Job.PLD
  });

  var selected = Math.floor(Math.random() * possibleTargets.length);
  return [new EntityTarget(possibleTargets[selected])];
};

chargeMechanics.castStart = function (instance) {
  var cPos = instance.caster.getPos();
  var tPos = instance.getAffectedTargets()[0].getPos();
  instance.caster.face = cPos.angleTo(tPos);
  instance.data["speed"] = cPos.distanceTo(tPos) / 500;
  instance.data["time"] = 0;
}

chargeMechanics.castExecution = function (instance, delta) {
  instance.data["time"] += delta;
  var time: number = instance.data["time"];
  if (time <= 500) {
    var speed: number = instance.data["speed"];
    instance.caster.move = Vector2D.unitFromAngle(instance.caster.face);
    instance.caster.move.toSize(speed * delta);
    return false;
  }
  return true;
}

var charge = new Ability(chargeMechanics, 1.5 * 1000, false, 3 * 1000);
enemy.abilities["charge"] = charge;



window.onload = () => {
  var container = document.getElementById("content");

  debug = document.createElement("div");
  debug.style.clear = "both";
  container.appendChild(debug);

  speed = document.createElement("input");
  speed.id = "speed";
  speed.type = "text";
  speed.value = "0.4";
  speed.style.clear = "both";
  container.appendChild(speed);

  deacc = document.createElement("input");
  deacc.id = "deacc";
  deacc.type = "text";
  deacc.value = "0.01";
  deacc.style.clear = "both";
  container.appendChild(deacc);

  canvas = initCanvas();
  context = canvas.getContext("2d");
  
  mainLoop(render);
};



function render(delta: number): boolean {
  context.clearRect(0, 0, canvas.width, canvas.height);
  debug.innerHTML = "FPS: " + fps;

  if (inputEngine.actions["special-x"] && player.accMove === null) {
    enemy.useAbility("charge", battleEngine);
  }

  battleEngine.update(delta);
  battleEngine.draw(context);
  return true;
}


function mainLoop(render: (number) => boolean): void {
  var running = true;
  var lastTime = 0;
  var frameTime = 0.0;
  var frameCount = 0;

  function loop(time: number): void {
    if (running) {
      requestAnimationFrame(loop);
      var delta = time - lastTime;
      frameTime += delta;
      if (frameTime > 1000) {
        frameTime -= 1000;
        fps = frameCount;
        frameCount = 0;
      }
      if (delta < 160) {
        frameCount++;
        running = render(delta);
      }
      lastTime = time;
    }
  }
  requestAnimationFrame(loop);
}

function initCanvas(): HTMLCanvasElement {
  var canvas = document.createElement("canvas");

  canvas.id = "canvas";
  canvas.width = 1000;
  canvas.height = 768;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";
  canvas.tabIndex = 1;
  inputEngine = new InputEngine(canvas);
  
  document.getElementById("content").appendChild(canvas);
  return canvas;
}