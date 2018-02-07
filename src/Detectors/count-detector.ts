import { Detector, LogEvent, EventMatcher, EventHandler} from "../types";
import { Factor } from "../factor";
import { BasicDetector } from "./basic-detector";

export class CountDetector extends BasicDetector {
  matcher: EventMatcher;
  factor: Factor;
  eventName: string;

  constructor(_matcher:EventMatcher, _factor:Factor, _handlers:EventHandler[]=[]) {
    super(_factor, _handlers);
    this.matcher = _matcher;
  }

  recordIncrement() {
    this.factor.value = this.factor.value + 1;
    this.log({
      value: this.factor.value,
      description: this.factor.description
    });
  }

  handleEvent(event:LogEvent) {
    if(this.matcher(event)) {
      this.recordIncrement();
    }
    super.handleEvent(event);
  }

}
