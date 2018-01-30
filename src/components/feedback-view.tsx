import * as React from "react";
import { Factor } from "../factor";
export interface FeedbackProps {
  chanel: string;
}

export interface FeedbackState {
  showing: boolean;
  feedbackItems: string[];
  factors: Factor[];
}

export class FeedbackView extends React.Component<
                                  FeedbackProps,
                                  FeedbackState> {

  constructor(props: FeedbackProps, ctxt: any) {
    super(props, ctxt);
    this.state = {
      showing: false,
      feedbackItems: [],
      factors: []
    };
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
          <div>
            close
          </div>
          <img width="100px" src="http://localhost:8080/rain-bot.png"/>
          <div style={{paddingLeft: "2em"}}>
            {this.state.feedbackItems.map( (fi) => <div>{fi}</div>) }
            <div style={{marginTop:"2em"}}>
              {this.state.factors.map( (fact) => {
                return(
                  <span style={{marginRight:"1em", fontFamily:"monospace", fontSize:"10pt"}}>
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
