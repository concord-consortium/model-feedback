export class Result {
  label: string;
  feedback: string;
  score: number;

  constructor(label:string, feedback:string, score:number=0) {
    this.label = label;
    this.feedback = feedback;
    this.score = score;
  }
}
export function ResultFromJson(obj:any) {
  return new Result(obj.label, obj.feedback, obj.score);
}
