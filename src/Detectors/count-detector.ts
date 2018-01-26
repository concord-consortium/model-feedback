import { Detector, Factor, LogEvent} from "../types";
import { BasicDetector } from "./basic-detector";

export class CountDetector extends BasicDetector {
  eventName: string;
  factor: Factor;

  constructor(_eventName:string, _factor:Factor) {
    super(_factor);
    this.eventName = _eventName;
  }

  handleEvent(event:LogEvent) {
    if(event.event === this.eventName) {
      this.factor.value = this.factor.value + 1;
    }
    super.handleEvent(event);
  }

}
