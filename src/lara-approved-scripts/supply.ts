import { Logger, LogEvent, Detector, EVENT_TYPES } from "../types";
import { FactorMap, FactorsFromJson } from "../factor";
import { ModelRuntimeDetector } from "../detectors/model-run-time-detector";
import { WellDetector } from "../detectors/well-detector-supply";
import { DecisionTree, DecisionTreeFromJson } from "../decision-tree";
import { WellManager } from "../supply-model/well-manager";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";

export class Supply implements Logger {
  description: string;
  name: string;
  detectors: Detector[];
  map: FactorMap;
  wellManagerFB: WellManager;
  wellManagerNF: WellManager;
  dtree: DecisionTree;
  context: PluginAPI.IPluginRuntimeContext;

  constructor(context: PluginAPI.IPluginRuntimeContext) {
    this.description = "monitor supply model student interactions for feedback.";
    this.name = "supply";
    const conf = context.authoredState && JSON.parse(context.authoredState);
    this.createFactorMap(conf.model);
    this.dtree = DecisionTreeFromJson(conf.model);
    this.wellManagerFB = new WellManager();
    this.wellManagerNF = new WellManager();
    const sendUpstream = (evt:LogEvent) => this.log(evt);
    this.detectors = [
      new ModelRuntimeDetector(this.map.m_tt1, [sendUpstream]),
      new WellDetector(this.map.n_fb_rur1, this.map.n_nf_rur1, this.map.n_fb_urb1, this.wellManagerFB, this.wellManagerNF, [sendUpstream])
    ];
    PluginAPI.events.onLog((logData: any) => {
      this.handleEvent(logData);
    });
    this.context = context;
  }

  // TODO (?): refactor this class so that it shares the same base with
  //           confined The methods below are repeated from that model.

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
    console.warn("LARA Plugin API not available, Supply terminating");
    return;
  }
  // tslint:disable-next-line:no-console
  console.log("LARA Plugin API available, Supply initialization");
  PluginAPI.registerPlugin("supply", Supply);
};

initPlugin();
