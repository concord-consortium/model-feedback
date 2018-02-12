import * as ReactDOM from "react-dom";
import * as React from "react";
import { Factor } from "../factor";
import { CloseButtonView } from "./close-button";
import { ReopenButton } from "./reopen-button";
import { Logger, LogEvent, EventListener, EVENT_TYPES, nTimeStamp} from "../types";

const flag = 0x32332;

// div class="ab-robot-analysis" ⬅ where to put our button...
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
  implements EventListener {

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
    // create a React component elsewhere in the Document.
    // I haven't seen many example of this, but it seems to work...
    const buttonContainer = document.createElement("div");
    const robotImageElm = document.querySelector(".ab-robot-analysis");
    (robotImageElm as Element).appendChild(buttonContainer);
    const x = React.createElement(ReopenButton, {
      onClick: (e:any) => this.reopen(),
      ref: (dom) => this.reopenButton = dom
    });
    ReactDOM.render(x, buttonContainer);
  }

  reopen() {
    this.setState({showing: true});
    setTimeout((e:any) => this.setState({showCloseBox: true}), 4000);
    this.log({
      event: "model-feedback-reopen"
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
      event: "model-feedback-closed",
      parameters: {
        duration: duration
      }
    });
  }
  log(logEvent:LogEvent) {
    if(this.mainLogger) {
      this.mainLogger.log(logEvent);
    }
  }

  handleEvent(logEvent:LogEvent) {
    switch(logEvent.event) {
      case(EVENT_TYPES.DISPLAY_MODEL_FEEDBACK):
        this.displayFeedback(logEvent.parameters);
        break;
      default:
        // nop
    }
  }

  private displayFeedback(params:FeedbackEventParams) {
    if(! this.state.hasBeenShown ) {
      this.startTime =  nTimeStamp();
      this.setState({
        showing: true,
        hasBeenShown: true,
        feedbackItems: JSON.parse(JSON.stringify(params.feedbackItems)),
        factors: JSON.parse(JSON.stringify(params.factors))
      });
      setTimeout((e:any) => this.setState({showCloseBox: true}), 4000);
      if(this.reopenButton) {
        this.reopenButton.setState({showing: true});
      }
      this.log({
        event: "model-feedback-shown",
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
          <img width="100px" src="http://localhost:8080/rain-bot.png"/>
          <div style={{paddingLeft: "2em"}}>
            {this.state.feedbackItems.map( (fi,i) => <div key={i}>{fi}</div>) }
            <div style={{marginTop:"2em"}}>
              {this.state.factors.map( (fact,i) => {
                return(
                  <span key={i}style={{marginRight:"1em", fontFamily:"monospace", fontSize:"10pt"}}>
                    <span>{fact.label}</span>:
                    <span>{fact.value}</span>
                  </span>);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
