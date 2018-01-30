"use strict";
exports.__esModule = true;
var condition_1 = require("./condition");
var result_1 = require("./result");
var DEFAULT_EXP = "==";
var DecisionTree = /** @class */ (function () {
    function DecisionTree(conditions, results) {
        var _this = this;
        this.tip = conditions[0];
        this.nodeMap = {};
        conditions.forEach(function (c) { return _this.addNode(c); });
        results.forEach(function (r) { return _this.addNode(r); });
    }
    DecisionTree.prototype.addNode = function (node) {
        this.nodeMap[node.label] = node;
    };
    DecisionTree.prototype.evaluate = function (factors) {
        var currentNode = this.tip;
        var nextLabel = "";
        while (currentNode && currentNode instanceof condition_1.Condition) {
            nextLabel = currentNode.eval(factors) ? currentNode.yes : currentNode.no;
            currentNode = this.nodeMap[nextLabel];
        }
        if (!(currentNode && currentNode instanceof result_1.Result)) {
            throw new Error("Incomplete decision tree");
        }
        return currentNode;
    };
    return DecisionTree;
}());
exports.DecisionTree = DecisionTree;
function DecisionTreeFromJson(obj) {
    var conditions = obj.conditions.map(function (conditionObj) { return condition_1.ConditionFromJson(conditionObj); });
    var results = obj.results.map(function (resultObj) { return result_1.ResultFromJson(resultObj); });
    return new DecisionTree(conditions, results);
}
exports.DecisionTreeFromJson = DecisionTreeFromJson;
