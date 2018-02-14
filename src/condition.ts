import { FactorMap } from "./factor";

export class Condition {
  constructor(
    readonly label: string,
    readonly factor: string,
    readonly expression: string,
    readonly value: number,
    readonly yes: string,
    readonly no: string
  ) {}

  eval(factors: FactorMap) {
    const factor = factors[this.factor].value;
    // TODO: use Jexl or other `eval` alternative
    const expression = `${factor} ${this.expression} ${this.value}`;
    // tslint:disable-next-line:no-eval
    const result = eval(expression);
    // console.log(`${expression}  : ${result}`);
    return result;
  }
}

export function ConditionFromJson(obj: any): Condition {
  return new Condition(
    obj.label,
    obj.factor,
    obj.expression,
    obj.value,
    obj.yes,
    obj.no
  );
}
