
import * as ReactDOM from "react-dom";
import * as React from "react";
import { FeedbackView} from "./components/feedback-view";
import { EVENT_TYPES } from "./types";

document.addEventListener("DOMContentLoaded", function(event) {
  const feedbackContainer = document.createElement("div");
  const argblockElm = document.querySelector(".arg-block");
  (argblockElm as Element).appendChild(feedbackContainer);
  const feedbackElm = React.createElement(FeedbackView, null);
  const feedbackView = ReactDOM.render(feedbackElm, feedbackContainer);
  feedbackView.setState({showing: true});

  feedbackView.handleEvent({
    event: EVENT_TYPES.DISPLAY_MODEL_FEEDBACK,
    parameters: {
      feedbackItems: ["good","job"],
      factors: [
        {name: "n1", value:1},
        {name: "n2", value:2}
      ]
    }
  });

});

