
const enum LogLevel {
  Verbose = 0,
  Info = 1,
  Important = 2,
  Error = 3,
}

class Logger {
  
  constructor(private el: HTMLElement) { }

  log(message: string, level: LogLevel = 1) {
    console.log(message);
    this.el.innerHTML += message + "<br/>";
    this.el.scrollTop = this.el.scrollHeight;
  }
}