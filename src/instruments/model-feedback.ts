
import { Instrument, Logger, LogEvent, Detector } from "../types";

export class ModelFeedback implements Instrument{
  description: string;
  name: string;
  div: HTMLElement;
  loggers: Logger[];

  constructor(elm:HTMLElement) {
    this.description = "Collect Model Events, provide feedback";
    this.name = "ModelFeedback";
    this.div = elm;
    this.loggers = [];
  }

  updateDiv(msg:string) {
    this.div.innerHTML = msg;
  }

  addLogger(logger:Logger) {
    this.loggers.push(logger);
  }

  log(event:LogEvent) {
    this.loggers.forEach(logger => {
      logger.log(event);
    });
  }

  handleEvent(event: LogEvent){
    this.reportEvent(event);
    this.detectEvents(event);
  }

  detectEvents(event: LogEvent) {
    this.detectors.forEach(detector => {

    });
  }

  reportEvent(event: LogEvent) {
    console.group('TestInstrument log');
    console.dir(event);
    console.groupEnd();
    const msg = `${event.time} : ${event.event}`;
    this.updateDiv(msg);
  }

}
