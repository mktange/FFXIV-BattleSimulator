/// <reference path="liveentity.ts" />
/// <reference path="enemytype.ts" />
/// <reference path="../engine/updateable.ts" />


class Enemy extends LiveEntity implements Updateable {

  preppingAbilities: AbilityInstance[];
  queuedAbilities: AbilityInstance[];

  constructor(enemyType: EnemyType, pos: Vector2D, face: number) {
    super(enemyType.name, pos, face, enemyType.range, enemyType.speed, enemyType.size, "orange");
    this.preppingAbilities = [];
    this.queuedAbilities = [];
  }


  update(delta: number): void {
    this.preppingAbilities.forEach(a => a.update(delta));
    this.preppingAbilities = this.preppingAbilities.filter(a => a.isPreparing());

    if (this.queuedAbilities.length > 0) {
      // Try to execute queued ability
      var instance = this.queuedAbilities[0];
      var castSuccess = super.castAbility(instance);
      if (castSuccess) this.queuedAbilities = this.queuedAbilities.slice(1);
    }

    if (this.target) {
      if (!this.castingAbility) {
        // Move towards target if not casting anything
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

  startAbility(name: string, engine: BattleEngine): boolean {
    var ability = this.abilities[name];
    if (!ability) {
      console.log("Unknown ability: '" + name + "'");
      return;
    }

    var instance = ability.createInstance(this, engine);
    if (instance.isCasting()) {
      var castSuccess = super.castAbility(instance);
      if (!castSuccess) this.queuedAbilities.push(instance);

    } else {
      this.preppingAbilities.push(instance);
    }
  }
}