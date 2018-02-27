import { LayerHelperBase } from "../well-and-aquifer/layer-helper";
import { Well } from "../well-and-aquifer/well";

export class LayerHelper extends LayerHelperBase {

  isUrban (well: Well):boolean {
    return well.x >= 25;
  }

  canPump (well: Well):boolean {
    const layer = this.layerFor(well);
    // Here, we do not consider the initial body of water, as the water tends
    // to fill high during model run.  Instead, we shall consider the well as
    // being capable of pumping as long as it is not stuck too deep in the
    // rock layer.  For instance, layer.name can be an empty string
    // (invisible top layer) in order to qualify for "canPump".
    if (layer.name.match(/rock/i)) {
      return false;
    }
    return true;
  }

}
