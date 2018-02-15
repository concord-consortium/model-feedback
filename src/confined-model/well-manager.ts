
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

  constructor() {
    this.reinit();
  }

  reinit(){
    this.actionCounter = 0;
    this.wellCount = 0;
    this.wells = {};
  }

  incActionCounter() {
    this.actionCounter++;
    return this.actionCounter;
  }

  keyForWell(well:Well) {
    return `${well.x}`;
  }

  find(well:Well) {
    return this.wells[this.keyForWell(well)];
  }

  add(well:Well) {
    this.wells[this.keyForWell(well)] = well;
    well.lastTick = this.incActionCounter();
    this.wellCount++;
    return well;
  }

  remove(well?:Well) {
    this.wellCount--;
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
      .map( (key:string) => this.wells[key])
      .filter( (i) => 'undefined' !== typeof i)
      .sort( (a:Well, b:Well) => {
        if((a.lastTick||0) < (b.lastTick||0)) { return  1; }
        if((a.lastTick||0) > (b.lastTick||0)) { return -1; }
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
