import * as React from "react";
import { Umbrella } from "../svg";

export interface ReopenButtonProps {
  onClick: ((e:any)=> void)| null;
}

export interface ReopenButtonState {
  hover: boolean;
  showing: boolean;
}

export class ReopenButton extends React.Component<
                                  ReopenButtonProps,
                                  ReopenButtonState> {

  constructor(props: ReopenButtonProps, ctxt: any) {
    super(props, ctxt);
    this.state = {
      hover: false,
      showing: false
    };
  }

  doClick(e:any) {
    if(this.props.onClick){
      this.props.onClick(e);
    }
  }

  render() {
    if(! this.state.showing) { return(<div/>); }

    const width = 40;
    const height = 40;
    const blue = "#265A9E";
    const white = "#ffffff";
    const fgColor = this.state.hover ? blue : white;
    const bgColor = this.state.hover ? white : blue;
    const ButtonStyle:React.CSSProperties= {
      backgroundColor: bgColor,
      color: fgColor,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      cursor: "pointer",
      transition: "0.4s ease-out",
      padding: "0.25em",
      borderRadius: "0.5em",
      margin: "1em 0px",
      width: "250px",
      boxShadow: "1px 5px 5px hsla(0,0%,0%,0.5)"
    };

    return(
      <div style={ButtonStyle}
        onClick={this.doClick.bind(this)}
        onMouseOver={(e) => this.setState({hover: true})}
        onMouseOut={(e) => this.setState({hover: false})}
      >
        Help me HASBOT!
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width={width} height={height}>
          <path d={Umbrella} id="☂" fill={fgColor}></path>
        </svg>
      </div>
    );
  }
}
