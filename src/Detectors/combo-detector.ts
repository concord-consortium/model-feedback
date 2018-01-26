import { Detector, Factor, LogEvent, EventHandler} from "../types";
import { BasicDetector } from "./basic-detector";

export class ComboDetector extends BasicDetector {
  detectors: Detector[];
  eventHandlers: EventHandler[];

  constructor(_factor:Factor, _detectors:Detector[]=[], _eventHandlers:EventHandler[]=[]) {
    super(_factor);
    this.detectors = [];
    this.eventHandlers = [];
    _detectors.forEach((d) => this.addDetector(d));
  }

  addDetector(d:Detector) {
    d.addHandler((e:LogEvent) => this.handleEvent(e));
    this.detectors.push(d);
  }

  handleEvent(event:LogEvent) {
    super.handleEvent(event);
    this.detectors.forEach( (d) => d.handleEvent(event));
    this.eventHandlers.forEach( (e) => e(event) );
  }

}
