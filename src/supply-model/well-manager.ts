import { LayerHelper } from "./layer-helper";
import { AquiferMap } from "./aquifer-map";
import { Well, WellManagerBase } from "../well-and-aquifer/well";

export class WellManager extends WellManagerBase {

  layerHelper: LayerHelper;

  reinit(){
    super.reinit();
    this.layerHelper = new LayerHelper(AquiferMap);
  }

  activeUrbanCount () {
    return this.livingWells().filter( (w) => w.urban === true &&
      w.canPump === true).length;
  }

  activeRuralCount () {
    return this.livingWells().filter( (w) => w.urban === false &&
      w.canPump === true).length;
  }

  livingWells() : Well[] {
    let ans = super.livingWells();
    ans.forEach((w) => {
      w.canPump = this.layerHelper.canPump (w);
      w.urban = this.layerHelper.isUrban(w);
    })
    return ans
  }

  stats() {
    const statsString = (`
      wellCount: ${this.wellCount}
      activeUrban: ${this.activeUrbanCount()}
      activeRural: ${this.activeRuralCount()}
      ${this.livingWells().map( (w:Well, i) => `well_${i}:  [X:${w.x}, Y:${w.y}]`).join("\n")}
    `).replace(/^\s+/gm,'');
    return statsString;
  }

}
