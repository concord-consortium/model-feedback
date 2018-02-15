import { YMap, IAquiferMap } from "./aquifer-map";
import { Well } from "./well-manager";

export interface LayerSlice {
  layer: YMap;
  name: string;
  yValue: number;
}

export class LayerHelper {
  layers: IAquiferMap;

  constructor(layers:IAquiferMap) {
    this.layers = layers;
  }

  // Return the layer in which X and Y are found.
  layerFor(well:Well):LayerSlice {
    const key = `${well.x}`;
    const sortedXLayers = Object.keys(this.layers)
      .map( (name:string) =>({name: name, layer:this.layers[name], yValue:this.layers[name][key]}))
      .sort( (a, b) => {
        if(a.yValue > b.yValue) { return 1;}
        if(a.yValue < b.yValue) { return -1;}
        return 0;
      });
    let index = 0;
    let xLayer = sortedXLayers[index];
    while((index < sortedXLayers.length) && ((well.y as number) > xLayer.yValue)) {
      xLayer=sortedXLayers[index];
      index++;
    }
    return xLayer;
  }

  isConfined(well:Well) {
    const layer= this.layerFor(well);
    if(layer.name.match(/unconfined/i)) {
      return false;
    }
    return true;
  }
}
