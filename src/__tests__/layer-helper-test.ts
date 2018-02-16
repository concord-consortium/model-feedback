import { YMap, AquiferMap, IAquiferMap } from "../confined-model/aquifer-map";
import { Well } from "../confined-model/well-manager";
import { LayerHelper } from "../confined-model/layer-helper";

const layers:IAquiferMap = {
  rock_bed_confined: {
    "0": -3,
    "1": -3,
    "2": -3,
    "3": -3
  },
  water_table_confined: {
    "0": -1,
    "1": -1,
    "2": -1,
    "3": -10
  },
  rock_ceiling_confined: {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 10
  },
  rock_bed_unconfined: {
    "0": 5,
    "1": 5,
    "2": 5,
    "3": 0
  },
  water_table_unconfined: {
    "0": 10,
    "1": 10,
    "2": 10,
    "3": 5
  }
};

let layerHelper:LayerHelper;

describe('LayerHelper', () => {
  beforeEach( () => {
    layerHelper = new LayerHelper(layers);
  });

  describe('wells at X=0', () =>{
    const well={x:0, y:0, lastTick:0};
    it("at depth -100", () => {
      well.y=-100;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_confined');
    });
    it("at depth -3", () => {
      well.y=-3;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_confined');
    });
    it("at depth -2", () => {
      well.y=-2;
      expect(layerHelper.layerFor(well).name).toBe('water_table_confined');
    });
    it("at depth -1", () => {
      well.y=-1;
      expect(layerHelper.layerFor(well).name).toBe('water_table_confined');
    });
    it("at depth 0", () => {
      well.y=0;
      expect(layerHelper.layerFor(well).name).toBe('rock_ceiling_confined');
    });
    it("at depth 2", () => {
      well.y=2;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_unconfined');
    });
    it("at depth 5", () => {
      well.y=5;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_unconfined');
    });
    it("at depth 10", () => {
      well.y=10;
      expect(layerHelper.layerFor(well).name).toBe('water_table_unconfined');
    });
    it("at depth 20", () => {
      well.y=20;
      expect(layerHelper.layerFor(well).name).toBe('water_table_unconfined');
    });
  });
  describe('wells at X=2', () =>{
    const well={x:2, y:0, lastTick:0};
    it("at depth -100", () => {
      well.y=-100;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_confined');
    });
    it("at depth -3", () => {
      well.y=-3;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_confined');
    });
    it("at depth -2", () => {
      well.y=-2;
      expect(layerHelper.layerFor(well).name).toBe('water_table_confined');
    });
    it("at depth -1", () => {
      well.y=-1;
      expect(layerHelper.layerFor(well).name).toBe('water_table_confined');
    });
    it("at depth 0", () => {
      well.y=0;
      expect(layerHelper.layerFor(well).name).toBe('rock_ceiling_confined');
    });
    it("at depth 2", () => {
      well.y=2;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_unconfined');
    });
    it("at depth 5", () => {
      well.y=5;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_unconfined');
    });
    it("at depth 10", () => {
      well.y=10;
      expect(layerHelper.layerFor(well).name).toBe('water_table_unconfined');
    });
    it("at depth 20", () => {
      well.y=20;
      expect(layerHelper.layerFor(well).name).toBe('water_table_unconfined');
    });
  });
  describe('wells at X=3', () =>{
    const well:Well={x:3, y:0, lastTick:0};
    it("at depth -100", () => {
      well.y=-100;
      expect(layerHelper.layerFor(well).name).toBe('water_table_confined');
    });
    it("at depth -3", () => {
      well.y=-3;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_confined');
    });
    it("at depth -2", () => {
      well.y=-2;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_unconfined');
    });
    it("at depth -1", () => {
      well.y=-1;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_unconfined');
    });
    it("at depth 0", () => {
      well.y=0;
      expect(layerHelper.layerFor(well).name).toBe('rock_bed_unconfined');
    });
    it("at depth 2", () => {
      well.y=2;
      expect(layerHelper.layerFor(well).name).toBe('water_table_unconfined');
    });
    it("at depth 5", () => {
      well.y=5;
      expect(layerHelper.layerFor(well).name).toBe('water_table_unconfined');
    });
    it("at depth 10", () => {
      well.y=10;
      expect(layerHelper.layerFor(well).name).toBe('rock_ceiling_confined');
    });
    it("at depth 20", () => {
      well.y=20;
      expect(layerHelper.layerFor(well).name).toBe('rock_ceiling_confined');
    });
  });

  describe("isConfined", () => {
    it("should match the layer name /confined/ ", () =>{
      const ys = [-4, -2, 0, 4, 8];
      const confineds = [true, true, true, false, false];
      const well = {x:0, y:ys[0], lastTick:0};
      ys.forEach( (y,i) => {
        well.y = y;
        expect(layerHelper.isConfined(well)).toBe(confineds[i]);
      });
    });
  });
});
