import {Detector, LogEvent, nTimeStamp, STOP_DETECTING, EventMatcher } from "../types";

import { Factor } from "../factor";

import { BasicDetector } from "./basic-detector";

export class DurationDetector extends BasicDetector {
  stop: EventMatcher;
  start: EventMatcher;
  factor: Factor;
  lastStartTime: number;

  constructor(start:EventMatcher, stop:EventMatcher, _factor:Factor) {
    super(_factor);
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
  }

}
