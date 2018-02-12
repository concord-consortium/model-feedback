import {LogEvent, nTimeStamp, EventMatcher, EventHandler} from "../types";

import { Factor } from "../factor";

import { BasicDetector } from "./basic-detector";

const NEW_INTERVAL = "model-feedback-new-interval";

export class DurationDetector extends BasicDetector {
  stop: EventMatcher;
  start: EventMatcher;
  running: boolean;
  factor: Factor;
  lastStartTime: number;

  constructor(start:EventMatcher, stop:EventMatcher, _factor:Factor, _handlers:EventHandler[]=[]) {
    super(_factor, _handlers);
    this.running = false;
    this.start = start;
    this.stop = stop;
  }

  handleEvent(event:LogEvent) {
    super.handleEvent(event);
    if(this.start(event)) {
      this.lastStartTime = nTimeStamp();
      this.running = true;
    }
    if(this.stop(event))  {
      this.updateInterval();
      this.running = false;
    }
    // for all events we record new interval if we are running
    if(this.running && event.parameters && (event.parameters.action !== NEW_INTERVAL)){
      this.updateInterval();
    }
  }

  updateInterval() {
    const now = nTimeStamp();
    const dts = (now - this.lastStartTime)/1000;
    this.factor.value = this.factor.value + dts;
    this.log({
      action: NEW_INTERVAL,
      factor: this.factor.label,
      newInterval: dts,
      description: this.factor.description,
      value: this.factor.value
    });
  }

}
