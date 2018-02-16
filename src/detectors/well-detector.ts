import { EventHandler, LogEvent, EVENT_TYPES} from "../types";
import { Factor } from "../factor";
import { BasicDetector } from "./basic-detector";
import { WellManager } from "../confined-model/well-manager";

export class WellDetector extends BasicDetector {
  wellManager:WellManager;
  confinedFactor: Factor;
  unconfinedFactor: Factor;
  total: number;

  constructor(
    _confinedFactor:Factor,
    _unconfinedFactor:Factor,
    _wellManager:WellManager,
    _handlers:EventHandler[]=[]) {
      super(_confinedFactor, _handlers);
      this.confinedFactor = _confinedFactor;
      this.unconfinedFactor = _unconfinedFactor;
      this.wellManager = _wellManager;
      this.reInit();
  }

  reInit() {
    this.wellManager.reinit();
    this.confinedFactor.value = 0;
    this.unconfinedFactor.value = 0;
    this.total = 0;
  }
  // look for start / stop / wellevents.
  handleEvent(event:LogEvent) {
    switch(event.event) {
      case EVENT_TYPES.STARTED_MODEL:
      case EVENT_TYPES.STOPED_MODEL:
      case EVENT_TYPES.RELOADED_MODEL:
        this.emitWellData(event);
        break;
      case EVENT_TYPES.RELOADED_INTERACTIVE:
        this.emitWellData(event);
        this.reInit();
      case EVENT_TYPES.WELL_ADDED:
      case EVENT_TYPES.WELL_MODIFIED:
        this.updateWell(event);
        break;
      case EVENT_TYPES.WELL_REMOVED:
        this.removeWell(event);
        break;
      default:
        // NO-OP
    }
  }

  updateWell(event:LogEvent) {
    const {x,y} = event.parameters;
    this.wellManager.modify({x,y});
  }

  emitWellData(event:LogEvent) {
    const newTotal = Object.keys(event.parameters)
      .filter( (k) => k.match(/^well/))
      .map( (k) => event.parameters[k])
      .reduce( (p,c) => p+c, 0);

    const {confined,unconfined} = this.wellManager.splitAmount(newTotal-this.total);
    this.total = this.total + newTotal;
    this.confinedFactor.value += confined;
    this.unconfinedFactor.value  += unconfined;

    this.emit({
      event: "well-output-report",
      parameters: {
        total: this.total,
        confined: this.confinedFactor.value,
        unconfined: this.unconfinedFactor.value
      }
    });
  }

  removeWell(event:LogEvent) {
    this.wellManager.remove();
  }
}
