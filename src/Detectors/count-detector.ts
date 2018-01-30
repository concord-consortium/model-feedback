import { Detector, LogEvent, EventMatcher} from "../types";
import { Factor } from "../factor";
import { BasicDetector } from "./basic-detector";

export class CountDetector extends BasicDetector {
  matcher: EventMatcher;
  factor: Factor;

  constructor(_matcher:EventMatcher, _factor:Factor) {
    super(_factor);
    this.matcher = _matcher;
  }

  handleEvent(event:LogEvent) {
    if(this.matcher(event)) {
      this.factor.value = this.factor.value + 1;
    }
    super.handleEvent(event);
  }

}
