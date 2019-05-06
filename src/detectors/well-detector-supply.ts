import { EventHandler, LogEvent, EVENT_TYPES} from "../types";
import { Factor } from "../factor";
import { BasicDetector } from "./basic-detector";
import { WellManager } from "../supply-model/well-manager";
import { NumberMap, ReserveableNumbersTracker as WellTracker } from "../types";

export class WellDetector extends BasicDetector {
  wellManagerFB:WellManager;
  wellManagerNF:WellManager;
  // tslint:disable:variable-name
  n_fb_rur: Factor;
  n_nf_rur: Factor;
  n_fb_urb: Factor;
  fbWellTracker: WellTracker;
  nfWellTracker: WellTracker;
  modelIsOn: boolean;

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
      this.fbWellTracker = new WellTracker ();
      this.nfWellTracker = new WellTracker ();
      this.reInit();
  }

  reInit() {
    this.wellManagerFB.reinit();
    this.wellManagerNF.reinit();
    this.modelIsOn = false;
    // If we collect cumulative statistics on well data across reload events,
    // which we do now, then we should NOT call reInit methods here.  But, we
    // must cancel reservations.
    this.fbWellTracker.cancelReserved ();
    this.nfWellTracker.cancelReserved ();
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
        this.modelIsOn = true;
        this.fbWellTracker.consumeReserved ();
        this.nfWellTracker.consumeReserved ();
        this.emitWellData(event);
        break;
      case EVENT_TYPES.STOPED_MODEL:
        this.modelIsOn = false;
        // no break---must pass through here.
      // ARG_BLOCK_SUBMIT: considered "stop model" for our purpose here.
      case EVENT_TYPES.ARG_BLOCK_SUBMIT:
        this.emitWellData(event);
        break;
      case EVENT_TYPES.RELOADED_MODEL:
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
    if (this.modelIsOn) {
      this.fbWellTracker.add (numbers);
    }
    else {
      this.fbWellTracker.reserve (numbers);
    }
  }

  updateTrackerNF () {
    const numbers: NumberMap = {
      'rural': this.wellManagerNF.activeRuralCount (),
      'urban': this.wellManagerNF.activeUrbanCount ()
    };
    if (this.modelIsOn) {
      this.nfWellTracker.add (numbers);
    }
    else {
      this.nfWellTracker.reserve (numbers);
    }
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
    const {rural: rfb, urban: ufb} = this.fbWellTracker.averages ();
    const {rural: rnf, urban: unf} = this.nfWellTracker.averages ();
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
