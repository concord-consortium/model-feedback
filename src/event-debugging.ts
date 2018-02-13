

import { Logger, EventListener, LogEvent } from "./types";
import { Context } from "./external-script-interfaces";

export class EventDebugging implements EventListener, Logger {
  description: string;
  name: string;
  mainLogger: Logger | null;

  constructor(conf:any, context:Context) {
    this.description = "event debugging script";
    this.name = "LoggingEventDebugger";
    this.mainLogger = conf.logger || null;
  }

  log(event:LogEvent) {
    this.reportEvent("out", event);
  }

  handleEvent(event: LogEvent, logger:Logger){
    this.reportEvent("in", event);
  }

  reportEvent(direction:string, event: LogEvent) {
    console.group('Event Debugger');
    console.dir(event);
    console.groupEnd();
  }

}
