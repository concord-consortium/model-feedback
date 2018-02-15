import { LayerHelper } from "./layer-helper";
import { AquiferMap } from "./aquifer-map";

export interface Well {
  x: number;
  y?: number;
  lastTick?: number;
}

interface WellMap {
  [key:string]: Well;
}

export class WellManager {

  private wells: WellMap;
  actionCounter: number;
  wellCount: number;
  layerHelper: LayerHelper;

  constructor() {
    this.reinit();
  }

  reinit(){
    this.actionCounter = 0;
    this.wellCount = 0;
    this.wells = {};
    this.layerHelper = new LayerHelper(AquiferMap);
  }

  incActionCounter() {
    this.actionCounter = this.actionCounter+1;
    return this.actionCounter;
  }

  keyForWell(well:Well) {
    return `${well.x}`;
  }

  find(well:Well) {
    return this.wells[this.keyForWell(well)];
  }

  add(well:Well) {
    this.wells[this.keyForWell(well)] =  {x:well.x, y:well.y};
    this.wells[this.keyForWell(well)].lastTick = this.incActionCounter();
    this.wellCount = this.wellCount + 1;
    return well;
  }

  remove(well?:Well) {
    this.wellCount = this.wellCount -1;
  }

  modify(well:Well) {
    let found = this.find(well);
    if(found) {
      found.y = well.y;
      found.lastTick = this.incActionCounter();
    }
    else {
      found = this.add(well);
    }
    return found;
  }

  livingWells() {
    return Object.keys(this.wells)
      .map( (key:string) => Object.assign({}, this.wells[key]))
      .sort( (a:Well, b:Well) => {
        if("undefined" !== typeof a.lastTick && "undefined" !== typeof b.lastTick) {
          if(a.lastTick < b.lastTick) { return 1; }
          if(a.lastTick > b.lastTick) { return -1; }
        }
        return 0;
      })
      .slice(0,this.wellCount);
  }

  stats() {
    const statsString = (`
      wellCount: ${this.wellCount}
      ${this.livingWells().map( (w:Well, i) => `well_${i}:  [X:${w.x}, Y:${w.y}]`).join("\n")}
    `).replace(/^\s+/gm,'');
    return statsString;
  }

}
