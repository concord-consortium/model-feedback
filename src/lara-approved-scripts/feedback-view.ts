import * as ReactDOM from "react-dom";
import * as React from "react";
import { FeedbackView } from "../components/feedback-view";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";

const DOM_SELECTOR=".arg-block";

class FeedbackViewer {
  name: string;
  description: string;
  feedbackView: FeedbackView;
  context: PluginAPI.IPluginRuntimeContext;

  constructor(context: PluginAPI.IPluginRuntimeContext) {
    this.description = "Provide visual feedback over arg-block";
    this.name = "ModelFeedback";
    this.context = context;
    this.setupReactView();
    PluginAPI.events.onLog((logData: any) => {
      this.feedbackView.handleEvent(logData);
    });
  }

  setupReactView() {
    const reactContainer = this.context.container;
    const argblock = document.querySelector(DOM_SELECTOR);
    (argblock as Element).appendChild(reactContainer);
    const element = React.createElement(FeedbackView, null);
    this.feedbackView = ReactDOM.render(element, reactContainer);
  }
}

export const initPlugin = () => {
  if (!PluginAPI || !PluginAPI.registerPlugin) {
    // tslint:disable-next-line:no-console
    console.warn("LARA Plugin API not available, FeedbackViewer terminating");
    return;
  }
  // tslint:disable-next-line:no-console
  console.log("LARA Plugin API available, FeedbackViewer initialization");
  PluginAPI.registerPlugin("feedbackView", FeedbackViewer);
};

initPlugin();
