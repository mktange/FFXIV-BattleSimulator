

class Ability {
  castTime: number;
  castRange: number;
  targets: AbilityTarget[];
}



/*
  Targeting
*/


interface AbilityTarget {
}

class GroundTarget implements AbilityTarget {
  pos: Position2D;
  radius: number;
}

class EntityTarget implements AbilityTarget {
  entity: Entity;
}


class ConeTarget implements AbilityTarget {
  direction: number;
  angle: number;
  length: number;
}

class LineTarget implements AbilityTarget {
  direction: number;
  width: number;
  length: number;
}
