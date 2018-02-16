import { Logger, EventListener, LogEvent, Detector, EVENT_TYPES } from "../types";
import { Factor, FactorMap, FactorsFromJson } from "../factor";
import { ModelRestartDetector } from "../detectors/model-restart-detector";
import { WellDetector } from "../detectors/well-detector";
import { RainProbablityDetector } from "../detectors/rain-probability-detector";
import { DecisionTree, DecisionTreeFromJson } from "../decision-tree";
import { Context, ExternalScriptHost } from "../external-script-interfaces";
import { WellManager } from "../confined-model/well-manager";

const externalScriptName = "confined";
export class Confined implements EventListener, Logger {
  description: string;
  name: string;
  mainLogger: Logger | null;
  detectors: Detector[];
  map: FactorMap;
  wellManager: WellManager;
  dtree: DecisionTree;


  constructor(conf:any, context:Context) {
    this.description = "monitor confined aquifer model student interactions for feedback.";
    this.name = externalScriptName;
    this.createFactorMap(conf.model);
    this.dtree = DecisionTreeFromJson(conf.model);
    this.wellManager = new WellManager();
    const sendUpstream = (evt:LogEvent) => this.log(evt);
    this.detectors = [
      new ModelRestartDetector(this.map.mt, [sendUpstream]),
      new RainProbablityDetector(this.map.rp_a, this.map.pr_r, [sendUpstream]),
      new WellDetector(this.map.uo, this.map.co, this.wellManager, [sendUpstream])
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

const context:ExternalScriptHost = (window as any).ExternalScripts;
context.register(externalScriptName, Confined);
