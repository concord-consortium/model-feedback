
import * as ReactDOM from "react-dom";
import * as React from "react";
import { FeedbackView, FeedbackState, FeedbackProps} from "./components/feedback-view";

document.addEventListener("DOMContentLoaded", function(event) {
  const feedbackContainer = document.createElement("div");
  const argblockElm = document.querySelector(".arg-block");
  (argblockElm as Element).appendChild(feedbackContainer);
  const feedbackElm = React.createElement(FeedbackView, null);
  const feedbackView = ReactDOM.render(feedbackElm, feedbackContainer);
  feedbackView.setState({showing: true});

});

