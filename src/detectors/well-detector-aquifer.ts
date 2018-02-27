import { EventHandler, LogEvent, EVENT_TYPES} from "../types";
import { Factor } from "../factor";
import { BasicDetector } from "./basic-detector";
import { WellManager } from "../aquifer-model/well-manager";
import { NumberMap, ReserveableNumbersTracker as WellTracker } from "../types";

export class AquiferWellDetector extends BasicDetector {
  wellManager:WellManager;
  wellTracker: WellTracker;
  confinedFactor: Factor;
  unconfinedFactor: Factor;
  totalIntegral: number;
  lastTime: number;
  lastTotal: number;
  model_is_on: boolean;

  constructor(
    _confinedFactor:Factor,
    _unconfinedFactor:Factor,
    _wellManager:WellManager,
    _handlers:EventHandler[]=[]) {
      super(_confinedFactor, _handlers);
      this.confinedFactor = _confinedFactor;
      this.unconfinedFactor = _unconfinedFactor;
      this.wellManager = _wellManager;
      this.wellTracker = new WellTracker ();
      this.reInit();
  }

  reInit() {
    this.wellManager.reinit();
    this.wellTracker.reInit();
    this.totalIntegral = 0;
    this.lastTime = 0;
    this.lastTotal = 0;
    this.model_is_on = false;
  }

  // look for start / stop / wellevents to integrate water output over time.
  handleEvent(event:LogEvent) {
    switch(event.event) {
      case EVENT_TYPES.STARTED_MODEL:
        this.model_is_on = true;
        this.wellTracker.consumeReserved ();
        this.emitWellData(event);
        break;
      case EVENT_TYPES.STOPED_MODEL:
      case EVENT_TYPES.RELOADED_MODEL:
        this.model_is_on = false;
        // no break---must pass through here.
      // ARG_BLOCK_SUBMIT: considered "stop model" for our purpose here.
      case EVENT_TYPES.ARG_BLOCK_SUBMIT:
        this.emitWellData(event);
        break;
      case EVENT_TYPES.RELOADED_INTERACTIVE:
        this.emitWellData(event);
        this.reInit();
        break;
      case EVENT_TYPES.WELL_ADDED_NF:
      case EVENT_TYPES.WELL_MODIFIED_NF:
        this.updateWell(event);
        break;
      case EVENT_TYPES.WELL_REMOVED_NF:
        this.removeWell(event);
        break;
      default:
        // NO-OP
    }
  }

  updateWellTracker () {
    const numbers: NumberMap = {
      'confined': this.wellManager.activeConfinedCount (),
      'unconfined': this.wellManager.activeUnconfinedCount ()
    };
    if (this.model_is_on)
      this.wellTracker.add (numbers);
    else
      this.wellTracker.reserve (numbers);
  }

  updateWell(event:LogEvent) {
    const {x,y} = event.parameters;
    this.wellManager.modify({x,y});
    this.updateWellTracker ();
  }

  removeWell(event:LogEvent) {
    this.wellManager.remove();
    this.updateWellTracker ();
  }

  emitWellData(event:LogEvent) {
    const {confined, unconfined} = this.wellTracker.totals ();
    const newTotal = Object.keys(event.parameters)
      .filter( (k) => k.match(/^well/))
      .map( (k) => event.parameters[k])
      .reduce( (p,c) => p+c, 0);
    const thisTime = event.time as number;
    // Here, we do a simple time-integration just by following the output
    // values whenever this method is called.  It is a crude approximation
    // based on the crude sparse information given by the logdata.
    if (this.lastTime) {
      this.totalIntegral += 0.5 * (newTotal + this.lastTotal) *
        (thisTime - this.lastTime) / 1000;
    } else // The Unix Epoch time means that integral did not start.
      this.totalIntegral = 0;
    this.lastTime = thisTime
    this.lastTotal = newTotal
    const allpumpingwells = confined + unconfined;
    if (allpumpingwells) {
      this.confinedFactor.value = this.totalIntegral * confined /
        allpumpingwells;
      this.unconfinedFactor.value = this.totalIntegral * unconfined /
        allpumpingwells;
    } else {
      this.confinedFactor.value = 0;
      this.unconfinedFactor.value = 0;
    }

    this.emit({
      event: "well-output-report",
      parameters: {
        totalIntegral: this.totalIntegral,
        confined: this.confinedFactor.value,
        unconfined: this.unconfinedFactor.value
      }
    });
  }

}
