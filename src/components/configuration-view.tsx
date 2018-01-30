import * as React from "react";
import { Factor } from "../factor";
import { JSONEditor } from "react-schema-based-json-editor";

const schema:any = {
  type: "object",
  properties: {
    model1: {
      type: "object",
      properties: {
        factors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              description: { type: "string" },
              type: { type: "string" }
            },
          }
        },
        conditions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              factor: { type: "string" },
              expression: { type: "string" },
              value: { type: "number" },
              yes: { type: "string" },
              no: { type: "string" }
            }
          }
        },
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              score: { type: "number" },
              feedback: { type: "string" }
            }
          }
        }
      }
    }
  }
};


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
    const backgroundColor = "hsla(0,0%,10%,0.9)";
    const style:React.CSSProperties= {
      backgroundColor: "white",
      overflow: "scroll"
    };


    return (
      <div style={style}>
        <JSONEditor
          schema={schema}
          initialValue={this.props.value}
          updateValue={ (v) => console.log(v) }
          theme="bootstrap3"
          icon="fontawesome4"
        />
      </div>
    );
  }
}
