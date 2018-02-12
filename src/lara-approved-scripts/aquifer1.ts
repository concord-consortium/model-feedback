import { AuquiferFeedback } from "../aquifer-feedback";
import { ExternalScriptHost } from "../external-script-interfaces";

const context:ExternalScriptHost = (window as any).ExternalScripts;
context.register("aquifer1", AuquiferFeedback);
