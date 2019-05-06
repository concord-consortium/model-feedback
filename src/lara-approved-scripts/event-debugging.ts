import { Logger, LogEvent } from "../types";
import * as PluginAPI from "@concord-consortium/lara-plugin-api";

export class EventDebugging implements Logger {
  description: string;
  name: string;

  constructor() {
    this.description = "event debugging script";
    this.name = "LoggingEventDebugger";
    PluginAPI.events.onLog((event: LogEvent) => {
      this.handleEvent(event);
    });
  }

  log(event: LogEvent) {
    this.reportEvent("out", event);
  }

  handleEvent(event: LogEvent){
    this.reportEvent("in", event);
  }

  reportEvent(direction:string, event: LogEvent) {
    console.group('Event Debugger');
    console.dir(event);
    console.groupEnd();
  }
}

export const initPlugin = () => {
  if (!PluginAPI || !PluginAPI.registerPlugin) {
    // tslint:disable-next-line:no-console
    console.warn("LARA Plugin API not available, EventDebugging terminating");
    return;
  }
  // tslint:disable-next-line:no-console
  console.log("LARA Plugin API available, EventDebugging initialization");
  PluginAPI.registerPlugin("debugging", EventDebugging);
};

initPlugin();
