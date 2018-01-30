import {LogEvent} from "./types";

export type Config = any;

export interface Context {
  name: string;
  scriptLabel: string;
  scriptUrl: string;
  embeddableId: string;
  div: string;
  config: Config;
}

export interface ExternalScript {
  handleEvent(logEvent:LogEvent): void;
}

export interface ExternalScriptConstructor {
  new(config: Config,  ctx: Context): ExternalScript;
}

export interface ExternalScriptHost {
  _constructors: {[key: string]:() => ExternalScriptConstructor};
  _scripts: any[];
  _script_labels:string[];
  init(label:string, ctx:Context): void;
  register(label:string, constructor: ExternalScriptConstructor): void;
  handleLogEvent(evt:LogEvent, script:ExternalScript): void;
}
