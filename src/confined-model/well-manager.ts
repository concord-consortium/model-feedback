import { LayerHelper } from "./layer-helper";
import { AquiferMap } from "./aquifer-map";

export interface Well {
  x: number;
  y?: number;
  lastTick: number;
  confined?: boolean;
  id?:number;
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

  keyForWell(well:Partial<Well>) {
    return `${well.x}`;
  }

  find(well:Partial<Well>) {
    return this.wells[this.keyForWell(well)];
  }

  add(well:Well) {
    this.wells[this.keyForWell(well)] =  {x:well.x, y:well.y, lastTick: this.incActionCounter()};
    this.wellCount = this.wellCount + 1;
    return well;
  }

  remove(well?:Well) {
    this.wellCount = this.wellCount -1;
  }

  modify(well:Partial<Well>) {
    let found = this.find(well);
    if(found) {
      found.y = well.y;
      found.lastTick = this.incActionCounter();
    }
    else {
      found = this.add(well as Well);
    }
    return found;
  }

  livingWells() {
    const makeWell = (key:string):Well =>{
      const oldWell = this.wells[key];
      return Object.assign({
        confined: this.layerHelper.isConfined(oldWell)
      }, oldWell);
    };

    return Object.keys(this.wells)
      .map(makeWell)
      .sort( (a:Well, b:Well) => {
        if(a.lastTick < b.lastTick) { return 1; }
        if(a.lastTick > b.lastTick) { return -1; }
        return 0;
      })
      .slice(0,this.wellCount);
  }

  confinedCount() {
    return this.livingWells().filter( (w) => w.confined === true).length;
  }

  unconfinedCount() {
    return this.livingWells().filter( (w) => w.confined === false).length;
  }

  splitAmount(flow:number){
    let unconfined = this.unconfinedCount();
    let confined = this.confinedCount();
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
      confined: ${this.confinedCount}
      unconfined: ${this.unconfinedCount}
      ${this.livingWells().map( (w:Well, i) => `well_${i}:  [X:${w.x}, Y:${w.y}]`).join("\n")}
    `).replace(/^\s+/gm,'');
    return statsString;
  }

}
