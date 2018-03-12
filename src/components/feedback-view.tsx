import * as ReactDOM from "react-dom";
import * as React from "react";
import { Factor } from "../factor";
import { CloseButtonView } from "./close-button";
import { ReopenButton } from "./reopen-button";
import { Logger, LogEvent, EventListener, EVENT_TYPES, nTimeStamp} from "../types";

const ROBOT_IMAGE_URL = "https://model-feedback.concord.org/rain-bot.png";
const DOM_SELECT_FOR_BUTTON = ".ab-robot-analysis";
const CLOSE_BUTTON_DELAY_TIME = 4000; // ms

export interface FeedbackProps {}

export interface FeedbackState {
  showing: boolean;
  hasBeenShown: boolean;
  feedbackItems: string[];
  factors: Factor[];
  showCloseBox: boolean;
}

interface FeedbackEventParams {
  feedbackItems: string[];
  factors: Factor[];
}

export class FeedbackView
  extends React.Component<
          FeedbackProps,
          FeedbackState>
  implements EventListener, Logger {

  mainLogger: Logger;
  reopenButton: ReopenButton | null;
  reopenCount: number;
  startTime: number;

  constructor(props: FeedbackProps, ctxt: any) {
    super(props, ctxt);
    this.state = {
      showing: false,
      hasBeenShown: false,
      feedbackItems: [],
      showCloseBox: false,
      factors: []
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
  }

  reopen() {
    this.setState({showing: true, showCloseBox:true});
    this.log({
      event: EVENT_TYPES.MODEL_FEEDBACK_REOPEN
    });
  }

  closeForever() {
    this.setState({showing:false});
    if(this.reopenButton) {
      this.reopenButton.setState({showing: false});
    }
  }

  close(){
    const timeNow  = nTimeStamp();
    const duration = timeNow - this.startTime;
    this.setState({showing: false, showCloseBox: false});
    this.log({
      event: EVENT_TYPES.MODEL_FEEDBACK_CLOSED,
      parameters: {
        duration: duration
      }
    });
  }

  log(logEvent:LogEvent, logger?:Logger) {
    if(this.mainLogger) {
      this.mainLogger.log(logEvent);
    }
  }

  handleEvent(logEvent:LogEvent, logger?:Logger) {
    if(!this.mainLogger && logger) { this.mainLogger = logger; }
    switch(logEvent.event) {
      case(EVENT_TYPES.DISPLAY_MODEL_FEEDBACK):
        this.displayFeedback(logEvent.parameters);
        break;
      default:
        // nop
    }
  }

  private displayFeedback(params:FeedbackEventParams) {
    const needToShow:boolean = params.feedbackItems.some
      ((s: string) => s.trim () !== "");
    if(needToShow && ! this.state.hasBeenShown ) {
      this.startTime =  nTimeStamp();
      this.setState({
        showing: true,
        hasBeenShown: true,
        feedbackItems: JSON.parse(JSON.stringify(params.feedbackItems)),
        factors: JSON.parse(JSON.stringify(params.factors))
      });
      setTimeout((e:any) => this.setState({showCloseBox: true}), CLOSE_BUTTON_DELAY_TIME);
      if(this.reopenButton) {
        this.reopenButton.setState({showing: true});
      }
      this.log({
        event: EVENT_TYPES.MODEL_FEEDBACK_SHOWN,
        parameters: {
          startTime: this.startTime
        }
      });
    }
    else {
      this.closeForever();
    }
  }

  render() {
    const backgroundColor = "hsla(0,0%,10%,0.9)";
    const style:React.CSSProperties= {
      position: "absolute",
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px",
      zOrder: "100",
      backgroundColor: backgroundColor,
      display: this.state.showing ? "flex" : "none",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    };
    const innerStyle: React.CSSProperties={
      position: "relative",
      backgroundColor: 'white',
      padding: '1em',
      margin: '2em',
      fontSize: "16pt",
      borderRadius: '1em',
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center"
    };
    return (
      <div style={style}>
        <div style={innerStyle}>

          <CloseButtonView showing={this.state.showCloseBox} onClick={(e) => this.close() }/>
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
        </div>
      </div>
    );
  }
}
