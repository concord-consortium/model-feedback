import { Factor } from "./factor";

export interface LogEvent {
  event: string;
  time?: number;
  parameters?: any;
}

export interface Logger {
  log(event:LogEvent): void;
}

export interface EventListener {
  handleEvent(data:LogEvent, log?:Logger|null): void;
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

export const EVENT_TYPES = {
  MODEL_FEEDBACK_STOP: "ModelFeedbackStop",
  RESET: "ModelFeedbackReset",
  DISPLAY_MODEL_FEEDBACK: "display-model-feedback",
  ARG_BLOCK_SUBMIT: "arg-block submit",
  OPEN_ACTIVITY_PAGE: "open activity page"
};

export type Expression = "<" |  "<=" |  "==" |  ">=" | ">";
