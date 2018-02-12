

import { Logger, EventListener, LogEvent, Detector, EVENT_TYPES } from "./types";
import { Factor, FactorMap, FactorsFromJson } from "./factor";
import { CountDetector } from "./Detectors/count-detector";
import { DurationDetector } from "./Detectors/duration-detector";
import { DecisionTree, DecisionTreeFromJson } from "./decision-tree";
import { Context } from "./external-script-interfaces";


export class AuquiferFeedback implements EventListener, Logger {
  description: string;
  name: string;
  mainLogger: Logger | null;
  detectors: Detector[];
  map: FactorMap;
  dtModelTime: DecisionTree;
  dtDropletTime: DecisionTree;

  constructor(conf:any, context:Context) {
    this.description = "Look at Aquifer 1 Model interaction for feedback.";
    this.name = "Aquifer1";
    this.createFactorMap(conf.model1);
    this.dtModelTime = DecisionTreeFromJson(conf.model1);
    this.dtDropletTime = DecisionTreeFromJson(conf.model2);
    const startModel  = (e:LogEvent) => e.event === EVENT_TYPES.STARTED_MODEL;
    const stopModel   = (e:LogEvent) =>  {
      switch(e.event) {
        case EVENT_TYPES.STOPED_MODEL:
        case EVENT_TYPES.RELOADED_MODEL:
        case EVENT_TYPES.RELOADED_INTERACTIVE:
          return true;
        default:
          return false;
      }
    };
    const startFollow = (e:LogEvent) => {
      return e.event === EVENT_TYPES.BUTTON_CLICKED && e.parameters.label === "Follow water droplet";
    };
    const stopFollow = (e:LogEvent) => {
      return (
        (e.event === EVENT_TYPES.BUTTON_CLICKED) &&
        (e.parameters.label === "Stop following")) ||
        (e.event === EVENT_TYPES.RELOADED_MODEL);
    };
    const sendUpstream = (evt:LogEvent) => this.log(evt);
    this.detectors = [
      new CountDetector(startModel,  this.map.m_n1, [sendUpstream]),
      new CountDetector(startFollow, this.map.f_n1, [sendUpstream]),
      new DurationDetector(startModel, stopModel, this.map.m_t1, [sendUpstream]),
      new DurationDetector(startFollow, stopFollow, this.map.f_t1, [sendUpstream])
    ];
  }

  createFactorMap(data:any) {
    this.map = FactorsFromJson(data.factors).map;
  }

  log(event:LogEvent) {
    if(this.mainLogger) {
      event.parameters.model=this.name;
      this.mainLogger.log(event);
    }
  }

  handleEvent(event: LogEvent, logger:Logger){
    this.detectEvents(event);
    if(! this.mainLogger) { this.mainLogger = logger; }
    if(event.event === EVENT_TYPES.ARG_BLOCK_SUBMIT) {
      const feedbackOne = this.dtModelTime.evaluate(this.map).feedback;
      const feedbackTwo = this.dtDropletTime.evaluate(this.map).feedback;
      const factorNames = Object.getOwnPropertyNames(this.map);
      const factors = factorNames.map( (key) => this.map[key]);
      const feedbackEvent:LogEvent ={ event: EVENT_TYPES.DISPLAY_MODEL_FEEDBACK, parameters:{
        showing: true,
        feedbackItems: [feedbackOne, feedbackTwo],
        factors: factors
      }};
      this.log(feedbackEvent);
    }
  }

  detectEvents(event: LogEvent) {
    this.detectors.forEach(detector => {
      detector.handleEvent(event);
    });
  }

}
