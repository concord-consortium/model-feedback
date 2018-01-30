import { Detector, LogEvent, EventHandler, RESET, Expression } from "./types";
import { FactorMap} from "./factor";
import { Condition, ConditionFromJson } from "./condition";
import { Result, ResultFromJson} from "./result";

const DEFAULT_EXP:Expression="==";

export type Node = Result | Condition;

export interface NodeMap {
  [key: string]: Node;
}

export class DecisionTree {
  nodeMap: NodeMap;
  tip: Node;

  constructor(conditions: Condition[], results: Result[]) {
    this.tip = conditions[0];
    this.nodeMap = {};
    conditions.forEach( (c) => this.addNode(c));
    results.forEach( (r) => this.addNode(r));
  }

  addNode(node: Node) {
    this.nodeMap[node.label]=node;
  }

  evaluate(factors:FactorMap) {
    let currentNode = this.tip;
    let nextLabel:string = "";
    while(currentNode && currentNode instanceof Condition) {
      nextLabel = currentNode.eval(factors) ? currentNode.yes : currentNode.no;
      currentNode = this.nodeMap[nextLabel];
    }
    if(! (currentNode && currentNode instanceof Result)) {
      throw new Error("Incomplete decision tree");
    }
    return (currentNode as Result);
  }

}
export function DecisionTreeFromJson(obj:any):DecisionTree {
  const conditions = obj.conditions.map((conditionObj:any) => ConditionFromJson(conditionObj));
  const results = obj.results.map((resultObj:any) => ResultFromJson(resultObj));
  return new DecisionTree(conditions, results);
}
