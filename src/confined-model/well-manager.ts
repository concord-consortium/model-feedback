import { LayerHelper } from "./layer-helper";
import { AquiferMap } from "./aquifer-map";
import { Well, WellManagerBase } from "../well-and-aquifer/well";

export class WellManager extends WellManagerBase {

  layerHelper: LayerHelper;

  reinit(){
    super.reinit();
    this.layerHelper = new LayerHelper(AquiferMap);
  }

  activeConfinedCount() {
    return this.livingWells().filter((w) => w.confined && w.canPump).length;
  }

  activeUnconfinedCount() {
    return this.livingWells().filter((w) => w.confined && w.canPump).length;
  }

  livingWells() : Well[] {
    let ans = super.livingWells();
    ans.forEach((w) => {
      w.canPump = this.layerHelper.canPump (w);
      w.confined = this.layerHelper.isConfined(w);
    })
    return ans
  }

  splitAmount(flow:number){
    let unconfined = this.activeUnconfinedCount();
    let confined = this.activeConfinedCount();
    const total = confined + unconfined;
    if (total < 1) {
      confined = 0;
      unconfined = 0;
    } else {
      confined = confined/total;
      unconfined = unconfined/total;
    }
    confined = confined * flow;
    unconfined = unconfined * flow;
    return({confined, unconfined});
  }

  stats() {
    const statsString = (`
      wellCount: ${this.wellCount}
      confined: ${this.activeConfinedCount()}
      unconfined: ${this.activeUnconfinedCount()}
      ${this.livingWells().map( (w:Well, i) => `well_${i}:  [X:${w.x}, Y:${w.y}]`).join("\n")}
    `).replace(/^\s+/gm,'');
    return statsString;
  }

}
