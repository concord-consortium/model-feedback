import { NumberMap, NumbersTracker } from '../types';


export interface Well {
  x: number;
  y?: number;
  lastTick: number;
  id?:number;
  // It is recommended that any of these two optional attributes is used in
  // combination with attribute "canPump" in order to make estimates about
  // the "active" wells of urban/rural or confined/unconfined charater.
  urban?: boolean;
  confined?: boolean;
  // This optional attribute "canPump" is designed to be used for the
  // capability for well to pump water that was there *initially* (that is,
  // if well is at the right location to touch the *initial* water).  Water
  // is changing dynamically and it is impossible to know where water is at
  // any given time just from logdata alone.  So, it is an approximation that
  // will become worse over time.
  canPump?: boolean;
}

interface WellMap {
  [key:string]: Well;
}

export class WellManagerBase {

  private wells: WellMap;
  actionCounter: number;
  wellCount: number;

  constructor() {
    this.reinit();
  }

  reinit(){
    this.actionCounter = 0;
    this.wellCount = 0;
    this.wells = {};
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
    this.wells[this.keyForWell(well)] = {x:well.x, y:well.y,
      lastTick: this.incActionCounter()};
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

  livingWells() : Well[] {
    const makeWell = (key:string):Well =>{
      const oldWell = this.wells[key];
      return Object.assign({}, oldWell);
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

}
