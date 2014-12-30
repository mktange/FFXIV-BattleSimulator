/// <reference path="liveentity.ts" />
/// <reference path="updateable.ts" />
/// <reference path="job.ts" />



class Player extends LiveEntity implements Updateable {
  
  constructor(public job: Job, pos: Vector2D, face: number) {
    super(pos, face, getJobRange(job), 200 / 1000, 10, getJobColor(job));
  }

  update(delta: number) {
    this.cancelCast();
    this.move.toSize(this.speed * delta);
    super.update(delta);
  }

  draw(context: CanvasRenderingContext2D) {
    super.draw(context);
  }
}
