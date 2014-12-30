/// <reference path="liveentity.ts" />
/// <reference path="updateable.ts" />
/// <reference path="enemytype.ts" />


class Enemy extends LiveEntity implements Updateable {

  queuedAbility: QueuedAbility;

  constructor(enemyType: EnemyType, pos: Vector2D, face: number) {
    super(pos, face, enemyType.range, enemyType.speed, enemyType.size, "orange");
    this.queuedAbility = null;
  }


  update(delta: number): void {
    if (this.target) {

      if (this.queuedAbility && this.getPos().distanceTo(this.target.getPos()) <= this.queuedAbility.range) {
        // Try to execute queued ability
        var success = super.useAbility(this.queuedAbility.name, this.queuedAbility.engine);
        if (success) this.queuedAbility = null;

      } else if (!this.activeAbility || this.activeAbility.isPreparing()) {
        // Move towards target
        var myPos = this.getPos();
        var tPos = this.target.getPos();

        var diff = myPos.getDiff(tPos);
        var dist = diff.length() - this.range;
        if (dist > 0) {
          this.move = diff.toSize(Math.min(dist, this.speed * delta));
        } else {
          this.move.x = 0;
          this.move.y = 0;
        }
      }
    }
    super.update(delta);
  }

  draw(context: CanvasRenderingContext2D): void {
    super.draw(context);
  }

  useAbility(name: string, engine: BattleEngine): boolean {
    var executed = super.useAbility(name, engine);
    var ability = this.abilities[name];
    if (!executed && ability && !this.queuedAbility) {
      this.queuedAbility = {
        name: name,
        engine: engine,
        range: ability.range,
      }
      return true;
    }
    return false;
  }
}

interface QueuedAbility {
  name: string;
  engine: BattleEngine;
  range: number;
}