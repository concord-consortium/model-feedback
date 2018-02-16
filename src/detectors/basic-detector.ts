import { Detector, LogEvent, EventHandler, EVENT_TYPES, nTimeStamp} from "../types";
import { Factor } from "../factor";

export class BasicDetector implements Detector {
  factor: Factor;
  eventHandlers: EventHandler[];
  eventName: string;

  constructor(_factor:Factor, _handlers:EventHandler[]=[]) {
    this.factor = _factor;
    this.eventName = `model-detector-event-${this.factor.label}`;
    this.eventHandlers = _handlers;
  }

  handleEvent(event:LogEvent) {
    if(event.event === EVENT_TYPES.RESET) {
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

  log(data:any) {
    const newEvent:LogEvent = {
      event: this.eventName,
      parameters: data,
      time: nTimeStamp()
    };
    this.emit(newEvent);
  }

}
