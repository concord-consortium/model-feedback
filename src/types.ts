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
  OPEN_ACTIVITY_PAGE: "open activity page",
  STARTED_MODEL: "StartedModel",
  STOPED_MODEL: "StoppedModel",
  RELOADED_MODEL: "ReloadedModel",
  RELOADED_INTERACTIVE: "ReloadedInteractive",
  BUTTON_CLICKED: "ButtonClicked",
  MODEL_FEEDBACK_SHOWN: "model-feedback-shown",
  MODEL_FEEDBACK_CLOSED: "model-feedback-closed",
  MODEL_FEEDBACK_REOPEN: "model-feedback-reopen",
  WELL_MODIFIED_FB: "FlowbackWellModified",
  WELL_ADDED_FB: "FlowbackWellAdded",
  WELL_REMOVED_FB: "FlowbackWellRemoved",
  WELL_MODIFIED_NF: "Non-flowbackWellModified",
  WELL_ADDED_NF: "Non-flowbackWellAdded",
  WELL_REMOVED_NF: "Non-flowbackWellRemoved",
  SLIDER_CHANGED: "SliderChanged"
};

export type Expression = "<" |  "<=" |  "==" |  ">=" | ">";

export interface NumberMap { [s: string]: number; }

export interface NumbersTracker {
  reInit (): void;
  add (numbers: NumberMap): void;
  averages (): NumberMap;
  totals (): NumberMap;

  consumeReserved? (): void;
  reserve? (numbers: NumberMap): void;
}

// This class could go into a separate file...  It is left here, since it is
// a pretty bland class.
export class ReserveableNumbersTracker implements NumbersTracker {

  ////
  // This class implements a string to number map collector/tracker.
  //
  // When a map is added, then it is counted as one instance, even though
  // that map may be empty.  Then, this class provides averages or totals.
  // The number of instances is important for averages.
  //
  // This class allows a general configuration where each number map added by
  // "add" method can have a set of different keys.  The super set of all
  // keys will be computed.
  //
  // If any "add" instance misses some keys, then that key is considered to
  // have 0 value at that instance.
  //
  // This class also implements a "reservation" mechanism.  This mechanism is
  // useful when number entries will be activated only later, triggered by
  // some other event.  In such a case, method "reserve" should be used,
  // instead of "add".  Later on, any call of "consumeReserved" or "add" will
  // consume the last reserved numbers and empty the reservation.
  //
  // Example case:
  //   Suppose students set up wells initially, without running the relevant
  //   model.  Well settings without running model does not have any impact
  //   on model behvaior.  Until the model is started, that is.  Naturally,
  //   we like to collect statistics of well settings only when we know that
  //   the model is running.  So, if we know that the model is not running,
  //   then we just keep calling "reserve".  When we know that the model is
  //   running, then we can manually call "consumeReserved."

  numMaps: NumberMap[];
  reserved: NumberMap | null;

  constructor () {
    this.reInit ();
  }

  reInit (): void {
    this.numMaps = [];
    this.cancelReserved ();
  }

  add (numbers: NumberMap): void {
    this.consumeReserved ();
    this.numMaps.push (numbers);
  }

  allNames (): string[] {
    // Here, ended up using "Arra.from (<Set>.values ())" instead of
    // [...<Set>] because typescript keeps complaining about it...
    // mistakenly? ("Set<string>" is not an array type).
    return this.numMaps.map ((m) => Object.keys (m))
      .reduce ((a, b) => Array.from(new Set ([...a, ...b]).values ()), []);
  }

  averages (): NumberMap {
    let ans = this.totals ();
    const N = this.numMaps.length;
    if (N) {
      for (let name in ans) {
        if (ans.hasOwnProperty(name)) {
          ans[name] /= N;
        }
      }
    }
    return ans;
  }

  totals (): NumberMap {
    let allNames = this.allNames();
    let ans: {[s: string]: number} = {};
    let sumFunc = (a: number, b: number): number => a + b;
    this.numMaps.map ((m) => console.log (m));
    allNames.forEach ((name) => {
      ans[name] = this.numMaps.map((m) => m[name] || 0.0)
        .reduce(sumFunc, 0.0);
    });
    return ans;
  }

  cancelReserved () {
    this.reserved = null;
  }

  consumeReserved () {
    // Everything except null is a meaningful value.  For example, an emtpy
    // mapping is also a meaningful value.   So, here we do a strict
    // comparison with null.
    if (this.reserved === null) { return; }
    let reserved = this.reserved;
    this.reserved = null; // important to avoid an infinite loop!
    this.add (reserved);
  }

  reserve (numbers: NumberMap) {
    // Only the last reservation matters.
    this.reserved = numbers;
  }

}
