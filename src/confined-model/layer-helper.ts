import { LayerHelperBase } from "../well-and-aquifer/layer-helper";
import { Well } from "../well-and-aquifer/well";

export class LayerHelper extends LayerHelperBase {

  isConfined(well:Well):boolean {
    const layer= this.layerFor(well);
    if(layer.name.match(/unconfined/i)) {
      return false;
    }
    return true;
  }

  canPump(well:Well):boolean {
    const layer= this.layerFor(well);
    if (layer.name.match (/water/i)) {
      return true;
    }
    return false;
  }

}
