import { YMap, IAquiferMap } from "./aquifer-map";
import { Well } from "./well";

export interface LayerSlice {
  layer: YMap;
  name: string;
  yValue: number;
}

export class LayerHelperBase {

  layers: IAquiferMap;

  constructor(layers:IAquiferMap) {
    this.layers = layers;
  }

  // Return the "layer" in which X and Y are found.
  layerFor(well:Well):LayerSlice {
    const key = `${well.x}`;
    const sortedXLayers = Object.keys(this.layers)
      .map( (name:string) => ({name: name, layer: this.layers[name],
          yValue: this.layers[name][key]}))
      .sort( (a, b) => {
        if(a.yValue > b.yValue) { return 1;}
        if(a.yValue < b.yValue) { return -1;}
        return 0;
      });
    // Here, the returned "LayerSlice" is given by the first trace which lies
    // on or above the y location of the well.
    //
    // If there is no such trace (i.e., if the well is above all traces; note
    // that this case also covers a potential situation where this.layers is
    // empty), then a special "empty top LayerSlice" object is returned:
    //
    //   A special "empy top LayerSlice" object is a LayerSlice object with
    //   no name (""), no layer ({}), and yValue (conveniently and
    //   artificially) just 1 above well.y.  It means that the well belongs
    //   in the "invisible top layer" above all layers defined in
    //   this.layers.
    let index = 0, xLayer = null;
    const wellY = well.y as number;
    while (true) {
      if (index === sortedXLayers.length) {
        // a special "empty top  LayerSlice" object
        xLayer = { layer: {}, name: "", yValue: wellY + 1 };
        break;
      }
      xLayer = sortedXLayers[index++];
      if (wellY <= xLayer.yValue) {
        break;
      }
    }
    // xLayer should never be null; we could insert an "assert statement"
    // here, if we do desire..
    return xLayer;
  }

}
