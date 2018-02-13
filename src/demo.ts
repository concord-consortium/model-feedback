
import * as ReactDOM from "react-dom";
import * as React from "react";
import { FeedbackView} from "./components/feedback-view";
import { EVENT_TYPES, LogEvent} from "./types";

const feedbackItems = [
  "It looks like you didn't spend enough time with the model! Run the model again  until a pool of water reaches the surface.",
  "It looks like you did not spend enough time following the water droplet! Follow it for 15 seconds or longer.."
];
document.addEventListener("DOMContentLoaded", function(event) {
  const feedbackContainer = document.createElement("div");
  const argblockElm = document.querySelector(".arg-block");
  (argblockElm as Element).appendChild(feedbackContainer);
  const feedbackElm = React.createElement(FeedbackView, null);
  const feedbackView = ReactDOM.render(feedbackElm, feedbackContainer);
  feedbackView.setState({showing: true});

  const logger = { log: (e:LogEvent) => console.log(e)};
  feedbackView.handleEvent({
    event: EVENT_TYPES.DISPLAY_MODEL_FEEDBACK,
    parameters: {
      feedbackItems: feedbackItems,
      factors: [
        {label: "n1", value:10},
        {label: "T1", value:0.12}
      ]
    }
  }, logger);
});

