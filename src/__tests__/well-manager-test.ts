
import { WellManager, Well } from "../confined-model/well-manager";

let wellManager:WellManager = new WellManager();

function newWell(x=0,y=0, lastTick=0){
  return {x: x, y: y, lastTick: lastTick };
}
describe('WellManager', () => {
  beforeEach( () => wellManager = new WellManager());

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
    let well = newWell();

    beforeEach( () => {
      wellManager.modify(well);
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
      let i = 0;
      let well;
      let wells:Well[] = [];

      const  makeWells = (count:number) => {
        wells = [];
        wellManager.reinit();
        for(i = 0; i < count; i++) {
          well = {x:i, y:0};
          wells.push(well);
          wellManager.add(well);
        }
      };

      beforeEach( () => makeWells(10));
      it("should have 10 wells", () =>{
        expect(wellManager.livingWells().length).toBe(10);
      });

      describe("Moving some, deleting some", () => {
        let i = 0;
        const deleteWells = (count:number) => {
          for(i=0; i < count; i++) {
            wellManager.remove();
          }
        };

        const modifyWells = (count:number) => {
          let index;
          let exlusions:number[] = [];
          const rndIndex = () => Math.round(Math.random() * wells.length);
          for(i=0; i < count; i++) {
            index = rndIndex();
            while(exlusions.indexOf(index) > 0) {
              index = rndIndex();
            }
            wells[index].y = 1;
            wellManager.modify(wells[index]);
          }
        };

        beforeEach(() => {
          modifyWells(5);
          deleteWells(5);
          console.log(wells);
        });

        it("the well manager should have 5 wells left", () => {
          expect(wellManager.livingWells().length).toBe(5);
        });
        it("the living wells have been moved", ()=> {
          wellManager.livingWells().forEach( (well) => {
            expect(well.y).toBe(1);
          });
        });
      });
    });
  });
});
