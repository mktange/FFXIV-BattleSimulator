
interface UpcomingEvent {
  event: FightEvent;
  delay: number;
}

class FightEvent {
  nextEvents: UpcomingEvent[];

  execute() {
    this.nextEvents.forEach((e) => {
      setTimeout(e.event.execute, e.delay);
    });

  }
}