import { Detector, Factor, LogEvent, nTimeStamp, STOP_DETECTING} from "../types";
import { BasicDetector } from "./basic-detector";

export class DurationDetector extends BasicDetector {
  startEventName: string;
  stopEventName: string;
  factor: Factor;
  elapsedTime: number;
  lastStartTime: number;

  constructor(startE:string, stopE:string, _factor:Factor) {
    super(_factor);
    this.startEventName = startE;
    this.stopEventName = stopE;
  }

  handleEvent(event:LogEvent) {
    super.handleEvent(event);
    if(event.event === this.startEventName) {
      this.lastStartTime = nTimeStamp();
    }
    if( event.event === this.stopEventName ||
        event.event === STOP_DETECTING)  {
          this.recordNewInterval();
      }
  }

  recordNewInterval() {
    const now = nTimeStamp();
    const dt = now - this.lastStartTime;
    this.factor.value = this.factor.value + dt;
  }

}
