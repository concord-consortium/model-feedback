

import { Logger, EventListener, LogEvent, Detector, EVENT_TYPES } from "./types";
import { Factor, FactorMap, FactorsFromJson } from "./factor";
import { CountDetector } from "./Detectors/count-detector";
import { DurationDetector } from "./Detectors/duration-detector";
import { DecisionTree, DecisionTreeFromJson } from "./decision-tree";
import { Context } from "./external-script-interfaces";
export class ModelFeedback implements EventListener, Logger {
  description: string;
  name: string;
  div: HTMLElement;
  mainLogger: Logger | null;
  detectors: Detector[];
  map: FactorMap;
  dtModelTime: DecisionTree;
  dtDropletTime: DecisionTree;

  // static config(context:Context) {
  //   // nothing happening here.
  // TODO
  // }

  constructor(conf:any, context:Context) {
    this.description = "Collect Model Events, provide feedback";
    this.name = "ModelFeedback";
    this.mainLogger = conf.logger || null;
    this.createFactorMap(conf.model1);
    this.dtModelTime = DecisionTreeFromJson(conf.model1);
    this.dtDropletTime = DecisionTreeFromJson(conf.model2);
    const startModel  = (e:LogEvent) => e.event === "StartedModel";
    const ReloadedModel  = (e:LogEvent) => e.event === "ReloadedModel";
    const stopModel   = (e:LogEvent) =>  {
      return e.event === "StoppedModel" || e.event === "ReloadedModel";
    };
    const startFollow = (e:LogEvent) => {
      return e.event === "ButtonClicked" && e.parameters.label === "Follow water droplet";
    };
    const stopFollow = (e:LogEvent) => {
      return (e.event === "ButtonClicked" && e.parameters.label === "Stop following") ||
        (e.event === "ReloadedMode");
    };
    const sendUpstream = (evt:LogEvent) => this.log(evt);
    this.detectors = [
      new CountDetector(startModel,  this.map.m_n1, [sendUpstream]),
      new CountDetector(ReloadedModel, new Factor("reload count"), [sendUpstream]),
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
      this.mainLogger.log(event);
    }
  }

  handleEvent(event: LogEvent, logger:Logger){
    this.detectEvents(event);
    this.reportEvent(event);
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

  reportEvent(event: LogEvent) {
    console.group('TestInstrument log');
    console.dir(event);
    console.groupEnd();
    this.detectors.forEach(detector => {
      console.log(`${detector.factor.label} ${detector.factor.value}`);
    });
  }

}
