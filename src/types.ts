import { Factor } from "./factor";

export interface LogEvent {
  event: string;
  time?: number;
  parameters?: any;
}

export interface Logger {
  log(event:LogEvent): void;
}

export interface Instrument {
  name: string;
  description: string;
  log(data:any): void;
  handleEvent(data:LogEvent): void;
  addLogger(logger:Logger): void;
}

export interface Detector {
  factor: Factor;
  handleEvent(event:LogEvent): void;
  emit(e:LogEvent):void;
  addHandler(e:EventHandler):void;
}

export type EventHandler = (e:LogEvent) => void;
export type EventMatcher = (e:LogEvent) => boolean;

export const nTimeStamp = () => Date.now(); // millisecons
export const STOP_DETECTING = "ModelFeedbackStop";
export const RESET = "ModelFeedbackReset";

export type Expression = "<" |  "<=" |  "==" |  ">=" | ">";
