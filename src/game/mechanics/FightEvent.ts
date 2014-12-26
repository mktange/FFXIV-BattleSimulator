
interface UpcomingEvent {
  event: FightEvent;
  delay: number;
}


class FightEvent {
  nextEvents: UpcomingEvent[];
  action: () => void;

  execute() {
    this.action();

    this.nextEvents.forEach((e) => {
      setTimeout(e.event.execute, e.delay);
    });

  }
}