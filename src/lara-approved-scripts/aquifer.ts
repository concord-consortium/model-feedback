import { Logger, LogEvent, Detector, EVENT_TYPES } from "../types";
import { FactorMap, FactorsFromJson } from "../factor";
import { ModelRuntimeDetector } from "../detectors/model-run-time-detector";
import { AquiferWellDetector } from "../detectors/well-detector-aquifer";
import { RainProbablityDetector } from "../detectors/rain-probability-detector";
import { DecisionTree, DecisionTreeFromJson } from "../decision-tree";
import { WellManager } from "../aquifer-model/well-manager";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";
import { AuthoringNotImplemented } from "../authoring-not-implemented";

export class Aquifer implements Logger {
  description: string;
  name: string;
  detectors: Detector[];
  map: FactorMap;
  wellManager: WellManager;
  dtree: DecisionTree;
  context: PluginAPI.IPluginRuntimeContext;

  constructor(context: PluginAPI.IPluginRuntimeContext) {
    this.context = context;
    this.description = "monitor aquifer model student interactions for feedback.";
    this.name = "aquifer";
    const conf = context.authoredState && JSON.parse(context.authoredState);
    this.createFactorMap(conf.model);
    this.dtree = DecisionTreeFromJson(conf.model);
    this.wellManager = new WellManager();
    const sendUpstream = (evt:LogEvent) => this.log(evt);
    this.detectors = [
      new ModelRuntimeDetector(this.map.mt, [sendUpstream], true),
      new RainProbablityDetector(this.map.rp_a, this.map.rp_r, [sendUpstream]),
      new AquiferWellDetector(this.map.co, this.map.uo, this.wellManager, [sendUpstream])
    ];
    PluginAPI.events.onLog((logData: any) => {
      this.handleEvent(logData);
    });
  }

  createFactorMap(data:any) {
    this.map = FactorsFromJson(data.factors).map;
  }

  log(event: LogEvent) {
    event.parameters.model = this.name;
    this.context.log(event);
  }

  handleEvent(event: LogEvent){
    this.detectEvents(event);
    if(event.event === EVENT_TYPES.ARG_BLOCK_SUBMIT) {
      const feedback = this.dtree.evaluate(this.map).feedback;
      const factorNames = Object.getOwnPropertyNames(this.map);
      const factors = factorNames.map( (key) => this.map[key]);
      const feedbackEvent:LogEvent ={ event: EVENT_TYPES.DISPLAY_MODEL_FEEDBACK, parameters:{
        showing: true,
        feedbackItems: [feedback],
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
    console.warn("LARA Plugin API not available, Aquifer terminating");
    return;
  }
  // tslint:disable-next-line:no-console
  console.log("LARA Plugin API available, Aquifer initialization");
  PluginAPI.registerPlugin({runtimeClass: Aquifer, authoringClass: AuthoringNotImplemented});
};

initPlugin();
