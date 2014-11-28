

class Entity {
  statusEffects: StatusEffect[];
  range: number;
  speed: number;

  target: Entity;

  constructor(private pos: Position2D, private face: number) {
  }
}