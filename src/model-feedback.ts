import * as ReactDOM from "react-dom";
import * as React from "react";

import { FeedbackView, FeedbackState, FeedbackProps} from "./components/feedback-view";
import { ConfigurationView } from "./components/configuration-view";

import { Instrument, Logger, LogEvent, Detector } from "./types";
import { Factor, FactorMap, FactorsFromJson } from "./factor";
import { CountDetector } from "./Detectors/count-detector";
import { DurationDetector } from "./Detectors/duration-detector";
import { Model as modelOne } from "./models/hee-sun-one";
import { Model as modelTwo } from "./models/hee-sun-two";
import { DecisionTree, DecisionTreeFromJson } from "./decision-tree";
import { Context } from "./external-script-interfaces";
export class ModelFeedback implements Instrument{
  description: string;
  name: string;
  div: HTMLElement;
  loggers: Logger[];
  detectors: Detector[];
  map: FactorMap;
  dtModelTime: DecisionTree;
  dtDropletTime: DecisionTree;
  feedbackView: FeedbackView;

  // static config(context:Context) {
  //   // nothing happening here.
  // }

  constructor(conf:any, context:Context) {
    this.description = "Collect Model Events, provide feedback";
    this.name = "ModelFeedback";
    console.dir(context);
    console.dir(conf);
    this.loggers = [];
    this.createFactorMap(modelOne);
    // this.dtModelTime = DecisionTreeFromJson(JSON.parse(modelOne));
    // this.dtDropletTime = DecisionTreeFromJson(JSON.parse(modelTwo));
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
    this.detectors = [
      new CountDetector(startModel,  this.map.m_n1),
      new CountDetector(ReloadedModel, new Factor("reload count")),
      new CountDetector(startFollow, this.map.f_n1),
      new DurationDetector(startModel, stopModel, this.map.m_t1),
      new DurationDetector(startFollow, stopFollow, this.map.f_t1)
    ];
    this.setupReactView();
  }

  createFactorMap(json:string) {
    this.map = FactorsFromJson(JSON.parse(json).factors).map;
  }

  updateDiv(msg:string) {
    this.div.innerHTML = msg;
  }

  addLogger(logger:Logger) {
    this.loggers.push(logger);
  }

  log(event:LogEvent) {
    this.loggers.forEach(logger => {
      logger.log(event);
    });
  }

  handleEvent(event: LogEvent){
    this.detectEvents(event);
    this.reportEvent(event);
    if(event.event === "arg-block submit") {
      const feedbackOne = this.dtModelTime.evaluate(this.map).feedback;
      const feedbackTwo = this.dtDropletTime.evaluate(this.map).feedback;
      const factorNames = Object.getOwnPropertyNames(this.map);
      const factors = factorNames.map( (key) => this.map[key]);
      this.feedbackView.setState({
        showing: true,
        feedbackItems: [feedbackOne, feedbackTwo],
        factors: factors
      });
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
    const msg = `${event.time} : ${event.event}`;
    this.detectors.forEach(detector => {
      console.log(`${detector.factor.label} ${detector.factor.value}`);
    });
  }

  setupReactView() {
    const reactContainer = document.createElement("div");
    const argblock = document.querySelector(".arg-block");
    (argblock as Element).appendChild(reactContainer);
    const element = React.createElement(FeedbackView, {chanel: 'joe'}, null);
    this.feedbackView = ReactDOM.render(element, reactContainer);
  }


}
