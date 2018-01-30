import { Detector, LogEvent, EventHandler, RESET} from "../types";
import { Factor } from "../factor";

export class BasicDetector implements Detector {
  factor: Factor;
  eventHandlers: EventHandler[];

  constructor(_factor:Factor, _handlers:EventHandler[]=[]) {
    this.factor = _factor;
    this.eventHandlers = _handlers;
  }

  handleEvent(event:LogEvent) {
    if(event.event === RESET) {
      this.factor.value = 0;
    }
  }

  addHandler(handler:EventHandler) {
    this.eventHandlers.push(handler);
  }

  emit(evt:LogEvent) {
    this.eventHandlers.forEach(handler => {
      handler(evt);
    });
  }

}
