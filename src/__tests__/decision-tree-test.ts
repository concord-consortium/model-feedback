import {Factor, FactorsFromJson, FactorMap} from "../factor";
import {Condition} from "../condition";
import {Result} from "../result";
import {DecisionTree, DecisionTreeFromJson} from "../decision-tree";

const turnOnHeat  = new Result("on","Brr. turning on the heat.");
const turnOffHeat = new Result("off","Its too hot, shutting off the heat.");

function run(actualTemp:number, desiredTemp:number) {
  const isHot = new Condition("isHot","heat", ">", desiredTemp, "off", "on");
  const heat:Factor = new Factor("heat", actualTemp);
  return new DecisionTree([isHot],[turnOffHeat, turnOnHeat]).evaluate({heat:heat});
}

describe('DecisionTree', () => {
  describe('When its too cold', () =>{
    it('Should turn the heat up', () => {
      expect(run(30,70)).toBe(turnOnHeat);
      expect(run(10,11)).toBe(turnOnHeat);
     });
  });
  describe('When its too hot', () =>{
    it('Should turn the heat off', () => {
      expect(run(100,70)).toBe(turnOffHeat);
      expect(run(72,71)).toBe(turnOffHeat);
     });
  });
  describe("when loading from json", ()=> {
    const json:string = `{
      "factors": [
        {"label": "R_t1", "description": "Elapsed run time in Seconds", "type": "Timer"},
        {"label": "m_t1", "description": "Model time in Seconds?", "type": "Timer"},
        {"label": "m_n1", "description": "Model launch count?", "type": "Count"},
        {"label": "f_t1", "description": "Follow time Seconds", "type": "Timer"}
      ],
      "conditions": [
        {"label": "C0", "factor": "R_t1", "expression": "< ", "value": 23, "yes": "R0", "no": "C1"},
        {"label": "C1", "factor": "m_t1", "expression": ">=", "value": 98, "yes": "C2", "no": "R6"},
        {"label": "C2", "factor": "m_n1", "expression": "< ", "value": 2.5,"yes": "C3", "no": "R5"},
        {"label": "C3", "factor": "R_t1", "expression": "< ", "value": 90, "yes": "C4", "no": "R4"},
        {"label": "C4", "factor": "f_t1", "expression": "< ", "value": 40, "yes": "R1", "no": "C5"},
        {"label": "C5", "factor": "f_t1", "expression": "< ", "value": 211,"yes": "R2", "no": "R3"}
      ],
      "results": [
        {"label": "R0", "score": 1, "feedback": "You should …"},
        {"label": "R1", "score": 1, "feedback": "You should …"},
        {"label": "R2", "score": 1, "feedback": "You should …"},
        {"label": "R3", "score": 1, "feedback": "Did you try  … ?"},
        {"label": "R4", "score": 1, "feedback": "Did you try  … ?"},
        {"label": "R5", "score": 1, "feedback": "Did you try  … ?"},
        {"label": "R6", "score": 1, "feedback": "Great!"}
      ]
    }`;
    const obj = JSON.parse(json);
    const dt = DecisionTreeFromJson(obj);
    it("should make a decision tree", () => {
      expect(dt).toBeInstanceOf(DecisionTree);
    });
    it("should follow the DT rules", () => {
      const {map} = FactorsFromJson(obj.factors);
      expect(dt.evaluate(map)).toBe(dt.nodeMap.R0);
      map.R_t1.value = 24;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.R6);
      map.m_t1.value = 98;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.R1);
      map.m_n1.value = 2.6;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.R5);
    });
  });
  describe("Hey-Sun's model time configuration", () => {
    const json:string = `{
      "factors": [
        {"label": "m_n1", "description": "Number of times the model has been run", "type": "Count"},
        {"label": "m_t1", "description": "Model run-time in seconds", "type": "Timer"}
      ],
      "conditions": [
        {"label": "C0", "factor": "m_n1", "expression": "< ", "value": 1,  "yes": "MF_R1", "no": "C1"},
        {"label": "C1", "factor": "m_t1", "expression": "<",  "value": 5,  "yes": "MF_R1", "no": "C2"},
        {"label": "C2", "factor": "m_t1", "expression": "<=", "value": 100,"yes": "MF_R2", "no": "C3"},
        {"label": "C3", "factor": "m_n1", "expression": "> ", "value": 2,  "yes": "NONE",  "no": "MF_R1"}
      ],
      "results": [
        {"label": "MF_R1", "score": 1, "feedback": "Run the model and observe what happens to water as it moves underground."},
        {"label": "MF_R2", "score": 2, "feedback": "It looks like you didn't spend enough time with the model! Run the model again  until a pool of water reaches the surface."},
        {"label": "NONE", "score": 3, "feedback": ""}
      ]
    }`;
    const obj = JSON.parse(json);
    const dt = DecisionTreeFromJson(obj);
    it("should make a decision tree", () => {
      expect(dt).toBeInstanceOf(DecisionTree);
    });
    it("should follow the DT rules", () => {
      const {map} = FactorsFromJson(obj.factors);
      expect(dt.evaluate(map)).toBe(dt.nodeMap.MF_R1);
      map.m_n1.value = 1;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.MF_R1);
      map.m_t1.value = 6;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.MF_R2);
      map.m_t1.value = 101;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.MF_R1);
      map.m_n1.value = 3;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.NONE);
    });
  });
  describe("Hey-Sun's droplet configuration", () => {
    const json:string = `
    {
      "factors": [
        {"label": "f_n1", "description": "Number many times water droplets have been followed.", "type": "Count"},
        {"label": "f_t1", "description": "How long the student spent following water droplets.", "type": "Timer"}
      ],
      "conditions": [
        {"label": "C0", "factor": "f_n1", "expression": "< ", "value": 1,   "yes": "MF_F1",     "no": "C1"},
        {"label": "C1", "factor": "f_t1", "expression": "<",  "value": 5,   "yes": "MF_F1",     "no": "C2"},
        {"label": "C2", "factor": "f_t1", "expression": "<=", "value": 200, "yes": "C3",        "no": "C4"},
        {"label": "C3", "factor": "f_n1", "expression": "< ", "value": 3,   "yes": "MF_F2_F3",  "no": "MF_F3"},
        {"label": "C4", "factor": "f_n1", "expression": "< ", "value": 3,   "yes": "MF_F2",     "no": "NONE"}
      ],
      "results": [
        {"label": "MF_F1",    "score": 1, "feedback": "It looks like you didn't follow any water droplets! Use the 'Follow a water droplet' button to follow several water droplets in the model."},
        {"label": "MF_F2",    "score": 2, "feedback": "It looks like you didn't follow enough water droplets. Follow a few more water droplets."},
        {"label": "MF_F2_F3", "score": 3, "feedback": "It looks like you didn't follow enough water droplets. Follow a few more water droplets. It looks like you did not spend enough time following the water droplet! Follow it for 15 seconds or longer.."},
        {"label": "MF_F3",    "score": 4, "feedback": "It looks like you did not spend enough time following the water droplet! Follow it for 15 seconds or longer.."},
        {"label": "NONE",     "score": 5, "feedback": ""}
      ]
    }
    `;
    const obj = JSON.parse(json);
    const dt = DecisionTreeFromJson(obj);
    it("should make a decision tree", () => {
      expect(dt).toBeInstanceOf(DecisionTree);
    });
    it("should follow the DT rules", () => {
      const {map} = FactorsFromJson(obj.factors);
      expect(dt.evaluate(map)).toBe(dt.nodeMap.MF_F1);
      map.f_n1.value = 1;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.MF_F1);
      map.f_t1.value = 6;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.MF_F2_F3);
      map.f_t1.value = 201;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.MF_F2);
      map.f_n1.value = 3;
      expect(dt.evaluate(map)).toBe(dt.nodeMap.NONE);
    });
  });
});
