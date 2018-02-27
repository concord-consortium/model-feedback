import {LogEvent, nTimeStamp, EventMatcher, EventHandler} from "../types";

import { Factor } from "../factor";

import { BasicDetector } from "./basic-detector";

const NEW_INTERVAL = "duration-detector-new-interval";

export class DurationDetector extends BasicDetector {
  start: EventMatcher;
  stop: EventMatcher;
  factor: Factor;
  lastStartTime: number;
  intervals: number[];
  protected avgmode: boolean;

  constructor(start:EventMatcher, stop:EventMatcher, _factor:Factor, _handlers:EventHandler[]=[], _avg=false) {
    super(_factor, _handlers);
    this.start = start;
    this.stop = stop;
    this.lastStartTime = 0.0;
    this.intervals = [];
    this.avgmode = _avg;
  }

  handleEvent(event:LogEvent) {
    super.handleEvent(event);
    if (this.start(event))
      this.lastStartTime = nTimeStamp();
    if (this.stop(event))  {
      if (this.lastStartTime) {
        const now = nTimeStamp ();
        const dts = (now - this.lastStartTime)/1000;
        this.intervals.push (dts);
        this.updateInterval (dts);
      }
      this.lastStartTime = 0.0;
    }
  }

  updateInterval(dts: number) {
    if (this.avgmode) {
      if (this.intervals.length)
        this.factor.value = this.intervals.reduce ((a, b) => a + b, 0.0)
          / this.intervals.length;
      else
        this.factor.value = 0.0;
    } else
      this.factor.value = this.intervals.reduce ((a, b) => a + b, 0.0);
    this.log({
      action: (this.avgmode? 'avg-':'') + NEW_INTERVAL,
      factor: this.factor.label,
      newInterval: dts,
      description: this.factor.description,
      value: this.factor.value
    });
  }

}
