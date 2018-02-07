import * as React from "react";
import { Factor } from "../factor";

export interface CloseButtonProps {
  onClick: ((e:any)=> void)| null;
  showing: boolean;
}

export interface CloseButtonState {
  hovering: boolean;
}

export class CloseButtonView extends React.Component<
                                  CloseButtonProps,
                                  CloseButtonState> {

  constructor(props: CloseButtonProps, ctxt: any) {
    super(props, ctxt);
    this.state = {
      hovering: false
    };
  }

  doClick(e:any) {
    if(this.props.onClick){
      this.props.onClick(e);
    }
  }

  render() {
    const style:React.CSSProperties= {
      position: "absolute",
      top: "10px",
      right: "10px",
      zOrder: "101",
      width: "1.25em",
      height: "1.5em",
      fontSize: "24pt",
      backgroundColor: "#275a9e",
      color: "white",
      borderRadius: "0.5em",
      display: this.props.showing ? "flex" : "none",
      alignItems: "center",
      flexDirection: "column",
      transition: "0.2s easeIn",
      justifyContent: "center"
    };

    return(
      <div style={style} onClick={this.doClick.bind(this)}>✖</div>
    );
  }
}
