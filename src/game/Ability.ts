/// <reference path="abilitytarget.ts" />

interface AbilityMechanics {
  getTargets: (caster: LiveEntity, engine: BattleEngine) => AbilityTarget[];
  castStart?: (instance: AbilityInstance) => void;
  castEnd?: (instance: AbilityInstance) => void;

  // Should return true if the execution is done, false otherwise
  castExecution?: (instance: AbilityInstance, delta: number) => boolean;
}


class Ability {
  constructor(public mechanics: AbilityMechanics, public castTime: number, public indicator = false, public prepTime = 0, public range = Number.MAX_VALUE) {
    if (!this.mechanics.castStart) this.mechanics.castStart = function () { };
    if (!this.mechanics.castEnd) this.mechanics.castEnd = function () { };
    if (!this.mechanics.castExecution) this.mechanics.castExecution = function () { return true; };
  }

  createInstance(caster: LiveEntity, engine: BattleEngine): AbilityInstance {
    return new AbilityInstance(caster, this, engine);
  }

}




class AbilityInstance {
  targets: AbilityTarget[];
  data: { [id: string] : any };

  private timeTracker: number;
  private updateFunc: (delta: number) => boolean;
    

  constructor(public caster: LiveEntity, private ability: Ability, public engine: BattleEngine) {
    this.updateFunc = this.prepFunc;
    this.timeTracker = 0;
    this.data = {};
    this.targets = this.ability.mechanics.getTargets(this.caster, this.engine);
  }

  update(delta: number): boolean {
    return this.updateFunc(delta);
  }

  private prepFunc(delta: number): boolean {
    this.timeTracker += delta;
    if (this.timeTracker < this.ability.prepTime) {
      return false;
    } else {
      this.updateFunc = this.castFunc;
      this.timeTracker -= this.ability.prepTime;
      this.ability.mechanics.castStart(this);
      this.caster.move.x = 0;
      this.caster.move.y = 0;
      return this.updateFunc(0);
    }
  }

  private castFunc(delta: number): boolean {
    this.timeTracker += delta;
    if (this.timeTracker < this.ability.castTime) {
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
}

