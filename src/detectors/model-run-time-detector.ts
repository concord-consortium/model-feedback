import { LogEvent, EventHandler, EVENT_TYPES } from "../types";
import { Factor } from "../factor";
import { DurationDetector } from "./duration-detector";

export class ModelRuntimeDetector extends DurationDetector {

  constructor(_factor:Factor, _handlers:EventHandler[]=[], _avg=false) {
      const startModel  = (e:LogEvent) => e.event === EVENT_TYPES.STARTED_MODEL;
      const stopModel   = (e:LogEvent) =>  {
        switch(e.event) {
          case EVENT_TYPES.STOPED_MODEL:
          case EVENT_TYPES.RELOADED_MODEL:
          case EVENT_TYPES.RELOADED_INTERACTIVE:
          // ARG_BLOCK_SUBMIT is included here, since we only care about the
          // data obtained just before the first argblock submit.  So, this is
          // OK for now.
          case EVENT_TYPES.ARG_BLOCK_SUBMIT:
              return true;
          default:
            return false;
        }
      };
      super(startModel, stopModel, _factor, _handlers, _avg);
  }

}
