import { Logger, LogEvent, Detector, EVENT_TYPES } from "../types";
import { FactorMap, FactorsFromJson } from "../factor";
import { CountDetector } from "../detectors/count-detector";
import { DurationDetector } from "../detectors/duration-detector";
import { ModelRuntimeDetector } from "../detectors/model-run-time-detector";
import { DecisionTree, DecisionTreeFromJson } from "../decision-tree";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";

export class TrapFeedback implements Logger {
  description: string;
  name: string;
  detectors: Detector[];
  map: FactorMap;
  dtModelTime: DecisionTree;
  dtDropletTime: DecisionTree;
  context: PluginAPI.IPluginRuntimeContext;

  constructor(context: PluginAPI.IPluginRuntimeContext) {
    this.description = "Look at Trap 1 Model interaction for feedback.";
    this.name = "aquifer";
    const conf = context.authoredState && JSON.parse(context.authoredState);
    this.createFactorMap(conf.model1);
    this.dtModelTime = DecisionTreeFromJson(conf.model1);
    this.dtDropletTime = DecisionTreeFromJson(conf.model2);
    const startModel  = (e:LogEvent) => e.event === EVENT_TYPES.STARTED_MODEL;
    const startFollow = (e:LogEvent) => {
      return e.event === EVENT_TYPES.BUTTON_CLICKED && e.parameters.label === "Follow water droplet";
    };
    const stopFollow = (e:LogEvent) => {
      return (
        (e.event === EVENT_TYPES.BUTTON_CLICKED) &&
        (e.parameters.label === "Stop following")) ||
        (e.event === EVENT_TYPES.RELOADED_INTERACTIVE) ||
        (e.event === EVENT_TYPES.RELOADED_MODEL);
    };
    const sendUpstream = (evt:LogEvent) => this.log(evt);
    this.detectors = [
      new CountDetector(startModel,  this.map.m_n1, [sendUpstream]),
      new CountDetector(startFollow, this.map.f_n1, [sendUpstream]),
      new ModelRuntimeDetector(this.map.m_t1, [sendUpstream]),
      new DurationDetector(startFollow, stopFollow, this.map.f_t1, [sendUpstream])
    ];
    PluginAPI.events.onLog((logData: any) => {
      this.handleEvent(logData);
    });
    this.context = context;
  }

  createFactorMap(data:any) {
    this.map = FactorsFromJson(data.factors).map;
  }

  log(event: LogEvent) {
    event.parameters.model = this.name;
    this.context.log(event);
  }

  handleEvent(event: LogEvent) {
    this.detectEvents(event);
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

export const initPlugin = () => {
  if (!PluginAPI || !PluginAPI.registerPlugin) {
    // tslint:disable-next-line:no-console
    console.warn("LARA Plugin API not available, Trap plugin terminating");
    return;
  }
  // tslint:disable-next-line:no-console
  console.log("LARA Plugin API available, Trap plugin initialization");
  PluginAPI.registerPlugin("trap", TrapFeedback);
};

initPlugin();
