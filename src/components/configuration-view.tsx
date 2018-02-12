import * as React from "react";

export interface ConfigurationProps {
  onComplete(data:any): void;
  value:any;
}

export interface ConfigurationState {
  value: any;
}

export class ConfigurationView extends React.Component<
                                  ConfigurationProps,
                                  ConfigurationState> {

  constructor(props: ConfigurationProps, ctxt: any) {
    super(props, ctxt);
    this.state = {value:''};
  }

  updateValue(newV: any) {
    this.setState({value:newV});
  }

  render() {
    // const backgroundColor = "hsla(0,0%,10%,0.9)";
    const style:React.CSSProperties= {
      backgroundColor: "white",
      overflow: "scroll"
    };


    return (
      <div style={style}>
        {/* <JSONEditor
          schema={schema}
          initialValue={this.props.value}
          updateValue={ (v:any) => console.log(v) }
          theme="bootstrap3"
          icon="fontawesome4"
        /> */}
      </div>
    );
  }
}
