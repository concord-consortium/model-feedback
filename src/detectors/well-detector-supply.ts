import { EventHandler, LogEvent, EVENT_TYPES} from "../types";
import { Factor } from "../factor";
import { BasicDetector } from "./basic-detector";
import { WellManager } from "../supply-model/well-manager";
import { NumberMap, ReserveableNumbersTracker as WellTracker } from "../types";

export class WellDetector extends BasicDetector {
  wellManagerFB:WellManager;
  wellManagerNF:WellManager;
  n_fb_rur: Factor;
  n_nf_rur: Factor;
  n_fb_urb: Factor;
  fb_well_tracker: WellTracker;
  nf_well_tracker: WellTracker;
  model_is_on: boolean;

  constructor(
    _n_fb_rur:Factor,
    _n_nf_rur:Factor,
    _n_fb_urb:Factor,
    _wellManagerFB:WellManager,
    _wellManagerNF:WellManager,
    _handlers:EventHandler[]=[]) {
      super(_n_fb_rur, _handlers);
      this.n_fb_rur = _n_fb_rur;
      this.n_nf_rur = _n_nf_rur;
      this.n_fb_urb = _n_fb_urb;
      this.wellManagerFB = _wellManagerFB;
      this.wellManagerNF = _wellManagerNF;
      this.fb_well_tracker = new WellTracker ();
      this.nf_well_tracker = new WellTracker ();
      this.reInit();
  }

  reInit() {
    this.wellManagerFB.reinit();
    this.wellManagerNF.reinit();
    this.fb_well_tracker.reInit ();
    this.nf_well_tracker.reInit ();
    this.model_is_on = false;
  }

  // Here, we must carefully coordinate our well trackers with model run
  // status.
  // 1. If model is running, use "WellTracker.add"; otherwise use
  //    "WellTracker.reserve".  (This is done in methods "updateTracker..".)
  // 2. If model starts to run, then we must immediately consume reserved
  //    numbers in well trackers.
  handleEvent(event:LogEvent) {
    switch(event.event) {
      case EVENT_TYPES.STARTED_MODEL:
        this.model_is_on = true;
        this.fb_well_tracker.consumeReserved ();
        this.nf_well_tracker.consumeReserved ();
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
      case EVENT_TYPES.WELL_ADDED_FB:
      case EVENT_TYPES.WELL_MODIFIED_FB:
        this.updateWellFB(event);
        break;
      case EVENT_TYPES.WELL_REMOVED_FB:
        this.removeWellFB(event);
        break;
      case EVENT_TYPES.WELL_ADDED_NF:
      case EVENT_TYPES.WELL_MODIFIED_NF:
        this.updateWellNF(event);
        break;
      case EVENT_TYPES.WELL_REMOVED_NF:
        this.removeWellNF(event);
        break;
      default:
        // NO-OP
    }
  }

  updateTrackerFB () {
    const numbers: NumberMap = {
      'rural': this.wellManagerFB.activeRuralCount (),
      'urban': this.wellManagerFB.activeUrbanCount ()
    };
    if (this.model_is_on)
      this.fb_well_tracker.add (numbers);
    else
      this.fb_well_tracker.reserve (numbers);
  }

  updateTrackerNF () {
    const numbers: NumberMap = {
      'rural': this.wellManagerNF.activeRuralCount (),
      'urban': this.wellManagerNF.activeUrbanCount ()
    };
    if (this.model_is_on)
      this.nf_well_tracker.add (numbers);
    else
      this.nf_well_tracker.reserve (numbers);
  }

  updateWellFB(event:LogEvent) {
    const {x,y} = event.parameters;
    this.wellManagerFB.modify({x,y});
    this.updateTrackerFB();
  }

  updateWellNF(event:LogEvent) {
    const {x,y} = event.parameters;
    this.wellManagerNF.modify({x,y});
    this.updateTrackerNF();
  }

  removeWellFB(event:LogEvent) {
    this.wellManagerFB.remove();
    this.updateTrackerFB();
  }

  removeWellNF(event:LogEvent) {
    this.wellManagerNF.remove();
    this.updateTrackerNF();
  }

  emitWellData(event:LogEvent) {
    const {rural: rfb, urban: ufb} = this.fb_well_tracker.averages ();
    const {rural: rnf, urban: unf} = this.nf_well_tracker.averages ();
    // Any of the four values that we assigned may be "undefined", because
    // the mapping returned by "averages" can be an empty mapping.
    this.n_fb_rur.value = rfb || 0.0;
    this.n_nf_rur.value = rnf || 0.0;
    this.n_fb_urb.value = ufb || 0.0;
    this.emit({
      event: "well-output-report",
      parameters: {
        n_fb_rur: this.n_fb_rur.value,
        n_fb_urb: this.n_fb_urb.value,
        n_nf_rur: this.n_nf_rur.value,
      }
    });
  }

}
