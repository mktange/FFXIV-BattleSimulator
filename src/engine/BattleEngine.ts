/// <reference path="../game/player.ts" />
/// <reference path="../game/enemy.ts" />


class BattleEngine implements Updateable {
  private controlable: Player;
  private players: Player[];
  private enemies: Enemy[];
  private entities: Updateable[];

  constructor() {
    this.players = [];
    this.enemies = [];
    this.entities = [];
  }

  update(delta: number) {
    if (this.controlable) {
      var dX = 0, dY = 0;
      if (inputEngine.actions['move-up']) dY -= 1;
      if (inputEngine.actions['move-down']) dY += 1;
      if (inputEngine.actions['move-left']) dX -= 1;
      if (inputEngine.actions['move-right']) dX += 1;

      if (dX || dY) {
        this.controlable.move = (new Vector2D(dX, dY)).toSize(this.controlable.speed * delta);
        this.controlable.face = this.controlable.move.getAngle();
      } else {
        this.controlable.move.x = 0;
        this.controlable.move.y = 0;
      }
    }
    this.entities.forEach(x => x.update(delta));
  }

  draw(context: CanvasRenderingContext2D) {
    this.entities.forEach(x => x.draw(context));
  }

  addPlayer(job: Job, pos: Vector2D, face: number): Player {
    var newPlayer = new Player(job, pos, face);
    this.addPlayerDirect(newPlayer);
    return newPlayer;
  }

  private addPlayerDirect(player: Player) {
    this.players.push(player);
    this.entities.push(player);
  }

  setControlablePlayer(player: Player): void {
    if (this.players.indexOf(player) < 0) {
      this.addPlayerDirect(player);
    }
    this.controlable = player;
  }

  addEnemy(enemyType: EnemyType, pos: Vector2D, face: number): Enemy {
    var enemy = new Enemy(enemyType, pos, face);
    this.enemies.push(enemy);
    this.entities.push(enemy);
    return enemy;
  }
}