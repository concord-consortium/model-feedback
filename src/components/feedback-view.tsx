import * as ReactDOM from "react-dom";
import * as React from "react";
import { Factor } from "../factor";
import { ReopenButton } from "./reopen-button";
import { Logger, LogEvent, EVENT_TYPES, nTimeStamp} from "../types";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";

const ROBOT_IMAGE_URL = "https://model-feedback.concord.org/rain-bot.png";
const DOM_SELECT_FOR_BUTTON = ".ab-robot-analysis";

export interface FeedbackProps {
  log: (logEvent: LogEvent) => void;
}

export interface FeedbackState {
  showing: boolean;
  hasBeenShown: boolean;
  feedbackItems: string[];
  factors: Factor[];
  showCloseBox: boolean;
  popupContainer: HTMLDivElement;
}

interface FeedbackEventParams {
  feedbackItems: string[];
  factors: Factor[];
}

export class FeedbackView
  extends React.Component<
          FeedbackProps,
          FeedbackState>
  implements Logger {

  reopenButton: ReopenButton | null;
  reopenCount: number;
  startTime: number;
  popupController: PluginAPI.IPopupController;

  constructor(props: FeedbackProps, ctxt: any) {
    super(props, ctxt);
    this.state = {
      showing: false,
      hasBeenShown: false,
      feedbackItems: [],
      showCloseBox: false,
      factors: [],
      popupContainer: document.createElement("div")
    };
    this.reopenCount = 0;
    this.startTime = 0;
    this.reopenCount = 0;
  }

  componentDidMount() {
    // Create a non-child React component elsewhere in the Document.
    // I haven't seen an example of this, but it seems to work.
    const buttonContainer = document.createElement("div");
    const robotImageElm = document.querySelector(DOM_SELECT_FOR_BUTTON);
    (robotImageElm as Element).appendChild(buttonContainer);
    const x = React.createElement(ReopenButton, {
      onClick: (e:any) => this.reopen(),
      ref: (dom) => this.reopenButton = dom
    });
    ReactDOM.render(x, buttonContainer);
    const { popupContainer } = this.state;
    this.popupController = PluginAPI.addPopup({
      content: popupContainer,
      autoOpen: false,
      modal: true,
      width: 600,
      padding: 0,
      removeOnClose: false,
      onClose: () => {
        const timeNow = nTimeStamp();
        const duration = timeNow - this.startTime;
        this.log({
          event: EVENT_TYPES.MODEL_FEEDBACK_CLOSED,
          parameters: {
            duration
          }
        });
      }
    });
  }

  reopen() {
    this.popupController.open();
    this.log({
      event: EVENT_TYPES.MODEL_FEEDBACK_REOPEN
    });
  }

  closeForever() {
    this.popupController.close();
    if (this.reopenButton) {
      this.reopenButton.setState({showing: false});
    }
  }

  log(logEvent: LogEvent) {
    this.props.log(logEvent);
  }

  handleEvent(logEvent: LogEvent) {
    if (logEvent.event === EVENT_TYPES.DISPLAY_MODEL_FEEDBACK) {
      this.displayFeedback(logEvent.parameters);
    }
  }

  private displayFeedback(params:FeedbackEventParams) {
    const needToShow:boolean = params.feedbackItems.some
      ((s: string) => s.trim () !== "");
    if (needToShow && ! this.state.hasBeenShown ) {
      this.startTime =  nTimeStamp();
      this.setState({
        hasBeenShown: true,
        feedbackItems: JSON.parse(JSON.stringify(params.feedbackItems)),
        factors: JSON.parse(JSON.stringify(params.factors))
      });
      if(this.reopenButton) {
        this.reopenButton.setState({showing: true});
      }
      this.log({
        event: EVENT_TYPES.MODEL_FEEDBACK_SHOWN,
        parameters: {
          startTime: this.startTime
        }
      });
      this.popupController.open();
    }
    else {
      this.closeForever();
    }
  }

  render() {
    const { popupContainer } = this.state;
    const innerStyle: React.CSSProperties={
      position: "relative",
      backgroundColor: 'white',
      padding: '1em',
      fontSize: "16pt",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center"
    };
    return ReactDOM.createPortal(
      <div style={innerStyle}>
        <img width="100px" src={ROBOT_IMAGE_URL}/>
        <div style={{padding: "1.5em", minWidth: "250px", maxWidth: "600px"}}>
          {this.state.feedbackItems.map( (fi,i) => <div style={{marginTop:"0.5em"}} key={i}>{fi}</div>) }
          <div style={{marginTop:"2em"}}>
            {this.state.factors.map( (fact,i) => {
              return(
                <span key={i}style={{marginRight:"1em", fontFamily:"monospace", fontSize:"10pt"}}>
                  <span>{fact.label}</span>:
                  <span>{(fact.value || 0).toFixed(2)}</span>
                </span>);
            })}
          </div>
        </div>
      </div>,
      popupContainer
    );
  }
}
