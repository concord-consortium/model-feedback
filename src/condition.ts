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
    // tslint:disable-next-line:no-unused-variable
    const factor = factors[this.factor];
    // TODO: use Jexl or other `eval` alternative
    // tslint:disable-next-line:no-eval
    return eval(`factor ${this.expression} ${this.value}`);
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
