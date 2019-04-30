import { Logger, EventListener, LogEvent, Detector, EVENT_TYPES } from "../types";
import { Factor, FactorMap, FactorsFromJson } from "../factor";
import { ModelRuntimeDetector } from "../detectors/model-run-time-detector";
import { WellDetector } from "../detectors/well-detector-supply";
import { RainProbablityDetector } from "../detectors/rain-probability-detector";
import { DecisionTree, DecisionTreeFromJson } from "../decision-tree";
import { Context, ExternalScriptHost } from "../external-script-interfaces";
import { WellManager } from "../supply-model/well-manager";

const externalScriptName = "supply";
export class Supply implements EventListener, Logger {
  description: string;
  name: string;
  mainLogger: Logger | null;
  detectors: Detector[];
  map: FactorMap;
  wellManagerFB: WellManager;
  wellManagerNF: WellManager;
  dtree: DecisionTree;


  constructor(conf:any, context:Context) {
    this.description = "monitor supply model student interactions for feedback.";
    this.name = externalScriptName;
    this.createFactorMap(conf.model);
    this.dtree = DecisionTreeFromJson(conf.model);
    this.wellManagerFB = new WellManager();
    this.wellManagerNF = new WellManager();
    const sendUpstream = (evt:LogEvent) => this.log(evt);
    this.detectors = [
      new ModelRuntimeDetector(this.map.m_tt1, [sendUpstream]),
      new WellDetector(this.map.nFbRur1, this.map.nNfRur1, this.map.nFbUrb1, this.wellManagerFB, this.wellManagerNF, [sendUpstream])
    ];
  }

  // TODO (?): refactor this class so that it shares the same base with
  //           confined The methods below are repeated from that model.

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
context.register(externalScriptName, Supply);
