

interface AbilityTarget {
  getAffectedEntities(engine: BattleEngine): LiveEntity[];
}


class EntityTarget implements AbilityTarget {
  constructor(public entity: LiveEntity) {}

  getAffectedEntities(engine: BattleEngine): LiveEntity[] {
    return [this.entity];
  }
}

class CircleTarget implements AbilityTarget {
  pos: Vector2D;
  radius: number;

  getAffectedEntities(engine: BattleEngine): LiveEntity[] {
    return engine.getLiveEntities().filter(e => {
      return this.pos.distanceTo(e.getPos()) <= this.radius;
    });
  }
}


class ConeTarget implements AbilityTarget {
  pos: Vector2D;
  direction: number;
  angleSize: number;
  radius: number;

  getAffectedEntities(engine: BattleEngine): LiveEntity[] {
    var minAngle = (this.direction - this.angleSize / 2 + 2 * Math.PI) % (2 * Math.PI)
    var maxAngle = (this.direction + this.angleSize / 2) % (2 * Math.PI)

    return engine.getLiveEntities().filter(e => {
      if (this.pos.distanceTo(e.getPos()) > this.radius) return false;

      var angleTo = this.pos.angleTo(e.getPos());
      if (minAngle < maxAngle) {
        return minAngle <= angleTo && angleTo <= maxAngle;
      } else {
        return minAngle <= angleTo || angleTo <= maxAngle;
      }
    });
  }
}

class LineTarget implements AbilityTarget {
  rect: Rectangle

  constructor(origin: Vector2D, direction: number, width: number, length: number) {
    this.rect = Rectangle.fromLineOrigin(origin, direction, width, length);
  }

  getAffectedEntities(engine: BattleEngine): LiveEntity[] {
    return engine.getLiveEntities().filter(e => {
      return this.rect.contains(e.getPos());
    });
  }
}
