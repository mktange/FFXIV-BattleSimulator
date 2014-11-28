
interface ArenaShape {
}

class CircleArena implements ArenaShape {

  constructor(private radius: number) {
  }
}

class RectangleArena implements ArenaShape {

  constructor(private width: number, private height: number) {
  }
}

class Arena {
  shape: ArenaShape;

}