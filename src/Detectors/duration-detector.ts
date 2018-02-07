import {Detector, LogEvent, nTimeStamp, EventMatcher, EventHandler} from "../types";

import { Factor } from "../factor";

import { BasicDetector } from "./basic-detector";

export class DurationDetector extends BasicDetector {
  stop: EventMatcher;
  start: EventMatcher;
  factor: Factor;
  lastStartTime: number;

  constructor(start:EventMatcher, stop:EventMatcher, _factor:Factor, _handlers:EventHandler[]=[]) {
    super(_factor, _handlers);
    this.start = start;
    this.stop = stop;
  }

  handleEvent(event:LogEvent) {
    super.handleEvent(event);
    if(this.start(event)) {
      this.lastStartTime = nTimeStamp();
    }
    if(this.stop(event))  {
      this.recordNewInterval();
    }
  }

  recordNewInterval() {
    const now = nTimeStamp();
    const dts = (now - this.lastStartTime)/1000;
    this.factor.value = this.factor.value + dts;
    this.log({
      action: 'new-interval',
      newInterval: dts,
      description: this.factor.description,
      value: this.factor.value
    });
  }

}
