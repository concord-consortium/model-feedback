import * as React from "react";
import * as ReactDOM from "react-dom";
import { FactorMap, Factor, FactorsFromJson } from "../factor";
import { DecisionTree, DecisionTreeFromJson } from "../decision-tree";

export interface DtTestViewProps {}

export interface DtTestViewState {
  dtJson: string;
  model: DecisionTree  | null;
  factors: FactorMap   | null;
  results: string;
}

(window as any).renderTest = function() {
  ReactDOM.render(
    <DtTestView />,
    document.getElementById('root')
  );
};

export class DtTestView extends React.Component<
                                  DtTestViewProps,
                                  DtTestViewState> {

  constructor(props: DtTestViewProps, ctxt: any) {
    super(props, ctxt);
    this.state = {
      results: "results: (not evealuated)",
      factors: null,
      dtJson: "",
      model: null
    };
  }

  updateDtModel(e:any) {
    const json = e.target.value;
    this.setState({dtJson: json, results: 'parsing ...'});
    try {
      const newJson = JSON.parse(json);
      const newFactors = FactorsFromJson(newJson.model.factors);
      const newModel = DecisionTreeFromJson(newJson.model);
      this.setState( { model:newModel, factors: newFactors.map });
      console.log("new json");
    }
    catch(e) {
      console.error(e);
      this.setState({results: "failed to parse json"});
      console.error("bad json");
    }
  }

  changeFactor(fact:Factor, value:string) {
    fact.value = parseInt(value, 10) || 0;
    console.log(fact.value);
    this.setState({factors: this.state.factors});
    if(this.state.model) {
      if(this.state.factors) {
        const result = this.state.model.evaluate(this.state.factors);
        const resultS = `${result.label} : ${result.feedback}`;
        console.log(resultS);
        this.setState({results: resultS});
      }
    }
  }

  renderFactor(fact:Factor) {
    const { label, description, value } = fact;
    return(
      <div className="factor" key={fact.label}>
        <div className="factorLabel">{label}</div>
        <div className="description">{description}</div>

        <input type="text" value={value} onChange={e => this.changeFactor.bind(this)(fact, e.target.value)} />
      </div>
    );
  }

  renderInputs() {
    const factors = this.state.factors || {};
    const keys = Object.keys(factors);
    return(
      <div id="inputs">
        {
          keys.map((k) => {
            const factor = factors[k];
            return factor ? this.renderFactor(factor) : null;
          })
        };
      </div>
    );
  }

  render() {
    const results = this.state.results;
    return(
      <div className="column">
        <div className="results">{results}</div>
          { this.renderInputs() }
        <div className="model">
          <textarea
            name="model"
            id="model"
            cols={130}
            rows={40}
            onChange={ (e:any) => this.updateDtModel.bind(this)(e)}
            value={this.state.dtJson}/>
        </div>
      </div>
    );
  }
}
