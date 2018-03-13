import { LogEvent, EventHandler, EVENT_TYPES, nTimeStamp} from "../types";
import { Factor } from "../factor";
import { BasicDetector } from "./basic-detector";

const SLIDER_PROP_NAME = "rainProbability";

export class RainProbablityDetector extends BasicDetector {
  probAverageF:Factor;
  probRangeF:Factor;
  max:number;
  min:number;
  currentAvg:number;
  lastTime:number;
  startTime:number;

  constructor(_avg:Factor, _range:Factor, _handlers:EventHandler[]=[]) {
    super(_avg, _handlers);
    this.probAverageF=_avg;
    this.probRangeF=_range;
    this.reInit();
  }
  reInit() {
    this.startTime = this.lastTime = nTimeStamp();
    this.probAverageF.value = NaN;
    this.probRangeF.value = NaN;
    this.max = this.min = NaN;
  }

  handleEvent(event:LogEvent) {
    switch(event.event) {
      case EVENT_TYPES.STARTED_MODEL:
      case EVENT_TYPES.STOPED_MODEL:
        this.updateFromLoadEvent(event);
        break;
      case EVENT_TYPES.RELOADED_MODEL:
      case EVENT_TYPES.RELOADED_INTERACTIVE:
        this.updateFromLoadEvent(event);
        ////
        // 03-13-2018:  For the factors to be computed cumulatively over
        // RELOAD events, it is more correct to NOT call reInit here.  One
        // side effect of not calling reInit would be that if student reloads
        // and then, only after a long break, restarts the model, then the
        // average value computed will be wrong (as it is computed as time
        // average---see below).  This, however, should be a rare occurence,
        // as students reloads usually when they think that some things are
        // going wrong and want to reload and restart the model.  To do the
        // time average properly in that type of edge case may take a
        // significant rewrite (?).
        //
        // this.reInit();
        break; // was missing, I think.
      case EVENT_TYPES.SLIDER_CHANGED:
        this.updateFromSliderEvent(event);
        break;
      default:
        // NOP
    }
  }

  setRange(prob:number) {
    if(isNaN(this.max)) { this.max = prob; }
    if(isNaN(this.min)) { this.min = prob; }
    if(prob > this.max) { this.max = prob; }
    if(prob < this.min) { this.min = prob; }
    this.probRangeF.value = this.max - this.min;
  }

  setAverage(prob:number) {
    const now = nTimeStamp();
    if(isNaN(this.probAverageF.value)) {
      this.probAverageF.value=prob;
      this.lastTime = now;
    }
    else {
      const totalElapsedTime = now - this.startTime;
      const elapsedTime = now - this.lastTime;
      const previousTime = totalElapsedTime - elapsedTime;
      const avg =
        ((this.probAverageF.value * previousTime) + (prob * elapsedTime))
        / totalElapsedTime;
      this.lastTime = now;
      this.probAverageF.value = avg;
    }
  }

  updateFromLoadEvent(event:LogEvent) {
    const {rainProbability} = event.parameters;
    this.setRange(rainProbability);
  }

  updateFromSliderEvent(event:LogEvent) {
    //parameters { endVal:.82, maxVal: .82, minVal:0.36, time:0.4,  property: "rainProbability"
    if(event.parameters.property && event.parameters.property===SLIDER_PROP_NAME) {
      const {endVal, maxVal, minVal} = event.parameters;
      this.setRange(minVal);
      this.setRange(maxVal);
      this.setAverage(endVal);
    }

  }

}
