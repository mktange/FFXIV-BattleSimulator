

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
  pos: Vector2D;
  radius: number;
}

class EntityTarget implements AbilityTarget {
  entity: LiveEntity;
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
