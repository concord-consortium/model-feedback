import { Detector, LogEvent, EventHandler, EVENT_TYPES, nTimeStamp} from "../types";
import { Factor } from "../factor";
import { BasicDetector } from "./basic-detector";

const SLIDER_PROP_NAME = "rainProbability";

export class RainProbablityDetector extends BasicDetector {
  probAverageF:Factor;
  probRangeF:Factor;
  max:number;
  min:number;
  lastTime:number;
  startTime:number;

  constructor(_avg:Factor, _range:Factor, _handlers:EventHandler[]=[]) {
    super(_avg, _handlers);
    this.reInit();
  }
  reInit() {
    this.startTime = this.lastTime = nTimeStamp();
    this.probAverageF.value = 0;
    this.probRangeF.value = 0;
    this.max = this.min = 0;
  }

  handleEvent(event:LogEvent) {
    switch(event.event) {
      case EVENT_TYPES.STARTED_MODEL:
      case EVENT_TYPES.STOPED_MODEL:
      case EVENT_TYPES.RELOADED_MODEL:
        this.updateFromLoadEvent(event);
        break;
      case EVENT_TYPES.RELOADED_INTERACTIVE:
        this.updateFromLoadEvent(event);
        this.reInit();
      case EVENT_TYPES.SLIDER_CHANGED:
        this.updateFromSliderEvent(event);
        break;
      default:
        // NOP
    }
  }

  setProbability(prob:number) {

  }

  updateFromLoadEvent(event:LogEvent) {
    const {rainProbability} = event.parameters;
    this.setProbability(rainProbability);
  }

  updateFromSliderEvent(event:LogEvent) {
    //parameters { endVal:.82, maxVal: .82, minVal:0.36, time:0.4,  property: "rainProbability"
    if(event.parameters.property && event.parameters.property===SLIDER_PROP_NAME) {
      const {endVal, maxVal, minVal} = event.parameters;
      this.setProbability(minVal);
      this.setProbability(maxVal);
      this.setProbability(endVal);
    }

  }

}
