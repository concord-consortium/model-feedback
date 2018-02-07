import * as ReactDOM from "react-dom";
import * as React from "react";
import { FeedbackView } from "../components/feedback-view";
import { ExternalScriptHost, ExternalScriptConstructor, Context} from "../external-script-interfaces";

class FeedbackViewer {
  name: string;
  description: string;
  feedbackView: FeedbackView;

  constructor(conf:any, context:Context) {
    this.description = "Provide visual feedback over arg-block";
    this.name = "ModelFeedback";
    this.setupReactView();
  }

  handleEvent(evt:any) {
    this.feedbackView.handleEvent(evt);
  }

  setupReactView() {
    const reactContainer = document.createElement("div");
    const argblock = document.querySelector(".arg-block");
    (argblock as Element).appendChild(reactContainer);
    const element = React.createElement(FeedbackView, null);
    this.feedbackView = ReactDOM.render(element, reactContainer);
  }

}
const context:ExternalScriptHost = (window as any).ExternalScripts;
context.register("feedbackView", FeedbackViewer);
