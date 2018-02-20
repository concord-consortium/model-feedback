import { LogEvent, EventHandler, EVENT_TYPES } from "../types";
import { Factor } from "../factor";
import { DurationDetector } from "./duration-detector";

export class ModelRuntimeDetector extends DurationDetector {

constructor(_factor:Factor, _handlers:EventHandler[]=[]) {
    const startModel  = (e:LogEvent) => e.event === EVENT_TYPES.STARTED_MODEL;
    const stopModel   = (e:LogEvent) =>  {
      switch(e.event) {
        case EVENT_TYPES.STOPED_MODEL:
        case EVENT_TYPES.RELOADED_MODEL:
        case EVENT_TYPES.RELOADED_INTERACTIVE:
          return true;
        default:
          return false;
      }
    };
    super(startModel, stopModel, _factor, _handlers);
  }

}
