

export interface FactorMap {
  [key: string]: Factor;
}

export class Factor {
  label: string;
  description: string;
  value: number;
  constructor(name:string, value:number=0,description="") {
    this.label = name;
    this.value = value;
    this.description=description;
  }
}
export function FactorsFromJson(objArray:any[]) {
  const map:FactorMap = {};
  const factors:Factor[] = [];
  objArray.forEach( (obj) => {
    const factor = new Factor(obj.label, obj.value, obj.description);
    factors.push(factor);
    map[obj.label] = factor;
  });
  return {map: map, factors:factors};
}
