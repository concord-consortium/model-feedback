export * from "./types";
export * from "./instruments/model-feedback";
import { Instrument } from "./types";
import { ModelFeedback } from "./instruments/model-feedback";

const instruments:Instrument[] = [];

(window as any).FeedbackInstruments = {
  addInstrument: (elm:HTMLElement) => instruments.push(new ModelFeedback(elm)),
  instruments: instruments
};
