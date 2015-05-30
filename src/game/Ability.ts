/// <reference path="abilitytarget.ts" />

interface AbilityMechanics {
  getTargets: (caster: LiveEntity, engine: BattleEngine) => AbilityTarget[];

  prep?: (instance: AbilityInstance, delta: number) => void;
  castStart?: (instance: AbilityInstance) => void;
  midCast?: (instance: AbilityInstance, delta: number) => void;
  castEnd?: (instance: AbilityInstance) => void;

  // Should return true if the execution is done, false otherwise
  castExecution?: (instance: AbilityInstance, delta: number) => boolean;
}


class Ability {
  constructor(
      public name: string,
      public mechanics: AbilityMechanics,
      public castTime: number,
      public indicator = false,
      public prepTime = 0,
      public range = Number.MAX_VALUE) {
    if (!this.mechanics.prep) this.mechanics.prep = function () { };
    if (!this.mechanics.castStart) this.mechanics.castStart = function () { };
    if (!this.mechanics.midCast) this.mechanics.midCast = function () { };
    if (!this.mechanics.castEnd) this.mechanics.castEnd = function () { };
    if (!this.mechanics.castExecution) this.mechanics.castExecution = function () { return true; };
  }

  createInstance(caster: LiveEntity, engine: BattleEngine): AbilityInstance {
    return new AbilityInstance(caster, this, engine);
  }

}



// Active instance of an ability
class AbilityInstance {
  name: string;

  targets: AbilityTarget[];
  data: { [id: string] : any };

  private timeTracker: number;
  private updateFunc: (delta: number) => boolean;
    

  constructor(public caster: LiveEntity, private ability: Ability, public engine: BattleEngine) {
    this.name = ability.name;
    this.timeTracker = 0;
    this.data = {};
    
    this.targets = this.ability.mechanics.getTargets(this.caster, this.engine);

    if (this.ability.prepTime > 0) {
      this.updateFunc = this.prepFunc;
      if (this.caster instanceof Enemy) {
        logger.log(this.name + " started preparing " + this.name + ".");
      }
    } else {
      this.updateFunc = this.queuedFunc;
    }
  }

  update(delta: number): boolean {
    return this.updateFunc(delta);
  }

  private prepFunc(delta: number): boolean {
    this.timeTracker += delta;
    if (this.timeTracker < this.ability.prepTime) {
      this.ability.mechanics.prep(this, delta);
      return false;
    } else {
      this.timeTracker -= this.ability.prepTime;
      this.updateFunc = this.queuedFunc;
      return this.updateFunc(0);
    }
  }

  private queuedFunc(delta: number): boolean {
    var castSuccess = this.caster.castAbility(this);
    if (castSuccess) {
      if (this.caster instanceof Enemy) {
        logger.log(this.name + " started casting " + this.name + ".");
      }
      this.updateFunc = this.castFunc;
      this.caster.move.x = 0;
      this.caster.move.y = 0;

      this.ability.mechanics.castStart(this);
      return this.updateFunc(delta)
    } else {
      this.updateFunc = this.queuedFunc;
      this.timeTracker = 0;
    }
    return false;
  }

  private castFunc(delta: number): boolean {
    this.timeTracker += delta;
    if (this.timeTracker < this.ability.castTime) {
      this.ability.mechanics.midCast(this, delta);
      return false;
    } else {
      this.updateFunc = this.executeFunc;
      this.ability.mechanics.castEnd(this);
      return this.updateFunc(this.timeTracker - this.ability.castTime);
    }
  }

  private executeFunc(delta: number): boolean {
    return this.ability.mechanics.castExecution(this, delta);
  }

  isPreparing(): boolean {
    return this.updateFunc === this.prepFunc;
  }

  isCasting(): boolean {
    return this.updateFunc === this.castFunc;
  }

  getAffectedTargets(): LiveEntity[] {
    var allTargets = [];
    if (this.targets) {
      allTargets = this.targets[0].getAffectedEntities(this.engine);
      this.targets.slice(1)
        .forEach(at => at.getAffectedEntities(this.engine)
          .forEach(e => {
            if (allTargets.indexOf(e) < 0) allTargets.push(e);
          }));
    }
    return allTargets;
  }

  getRange(): number {
    return this.ability.range;
  }
}

