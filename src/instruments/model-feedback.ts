
import { Instrument, Logger, LogEvent, Detector, Factor } from "../types";
import { CountDetector } from "../Detectors/count-detector";
import { DurationDetector } from "../Detectors/duration-detector";
export class ModelFeedback implements Instrument{
  description: string;
  name: string;
  div: HTMLElement;
  loggers: Logger[];
  detectors: Detector[];

  constructor(elm:HTMLElement) {
    this.description = "Collect Model Events, provide feedback";
    this.name = "ModelFeedback";
    this.div = elm;
    this.loggers = [];
    this.detectors = [
      new CountDetector("StartedModel",new Factor("play count")),
      new CountDetector("ButtonClicked",new Factor("button clicks")),
      new DurationDetector("StartedModel","StoppedModel", new Factor("play duration"))
    ];
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
      detector.handleEvent(event);
    });
  }

  reportEvent(event: LogEvent) {
    console.group('TestInstrument log');
    console.dir(event);
    console.groupEnd();
    const msg = `${event.time} : ${event.event}`;
    this.updateDiv(msg);
    this.detectors.forEach(detector => {
      console.log(`${detector.factor.name} ${detector.factor.value}`);
    });
  }

}
