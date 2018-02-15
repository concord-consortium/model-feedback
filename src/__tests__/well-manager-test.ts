
import { WellManager, Well } from "../confined-model/well-manager";

let wellManager:WellManager;

const  makeWells = (count:number) => {
  wellManager.reinit();
  for(let i = 0; i < count; i++) {
    wellManager.add({x:i, y:0});
  }
};

const deleteWells = (count:number) => {
  for(let i=0; i < count; i++) {
    wellManager.remove();
  }
};

const modifyWells = (count:number) => {
  const remainingWells = wellManager.livingWells().slice(0,count);
  remainingWells.forEach( (w) => wellManager.modify({x:w.x, y:1}));
};


describe('WellManager', () => {

  function newWell(x=0,y=0, lastTick=0){
    return {x: x, y: y, lastTick: lastTick };
  }
  beforeEach( () => wellManager = new WellManager());
  afterEach( () => wellManager.reinit() );
  describe('When its iniitalized', () =>{
    it('There should be zero wells', () => {
      expect(wellManager.livingWells().length).toBe(0);
    });
  });

  describe('When a well is added', () => {
    beforeEach( () => wellManager.add({x:0,y:0,lastTick:0}));
    it('There should be a well', () => {
      expect(wellManager.livingWells().length).toBe(1);
    });
    describe('When a well is removed again', () => {
      beforeEach( () => wellManager.remove({x:0, y:0, lastTick:0}));
      it('There should be no wells', () => {
        expect(wellManager.livingWells().length).toBe(0);
      });
    });
  });

  describe("Modifying a non-existent well", () =>  {
    beforeEach( () => {
      wellManager.modify(newWell());
    });

    it("There should be one well now", () => {
      expect(wellManager.livingWells().length).toBe(1);
    });

    describe("Modifying the newly created well", () => {
      beforeEach( () => {
        wellManager.modify({x:0, y:20});
      });

      it("There should still only be one well", () => {
        expect(wellManager.livingWells().length).toBe(1);
      });

      it("should have an updated y value (20)", () => {
        expect(wellManager.livingWells()[0].y).toBe(20);
      });
    });

    describe("modifying a well with different x location", ()=> {
      beforeEach( () => {
        wellManager.modify({x:20, y:21});
      });
      it("There should be two wells", () => {
        expect(wellManager.livingWells().length).toBe(2);
      });
      it("most recent well should have y of value (21)", () => {
        expect(wellManager.livingWells()[0].y).toBe(21);
      });

      describe("#stats", ()=> {
        it("should include the well labels", () => {
          expect(wellManager.stats()).toMatch(/well_0/);
          expect(wellManager.stats()).toMatch(/well_1/);
        });
      });

      describe("removing a well", () => {
        beforeEach( () => wellManager.remove());
        it("Should leave the most recently moved well", () => {
          expect(wellManager.livingWells().length).toBe(1);
          expect(wellManager.livingWells()[0].y).toBe(21);
        });
      });
    });

    describe("a bunch of wells being updated", () => {


      describe("Moving some, deleting some", () => {
        beforeEach(() => {
          makeWells(10);
          modifyWells(5);
          deleteWells(5);
        });

        it("the well manager should have 5 wells left", () => {
          expect(wellManager.livingWells().length).toBe(5);
        });

        it("the living wells have been moved", ()=> {
          const ws = wellManager.livingWells();
          ws.forEach( (well) => {
            console.log(well);
            expect(well.y).toBe(1);
          });
        });
      });
    });
  });
});
