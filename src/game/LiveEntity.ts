/// <reference path="statuseffect.ts" />
/// <reference path="ability.ts" />
/// <reference path="../engine/vector2d.ts" />



class LiveEntity {
  statusEffects: StatusEffect[];
  
  abilities: Ability[];
  target: LiveEntity;

  constructor(public pos: Vector2D, public face: number, public range: number, public speed: number) { }
}