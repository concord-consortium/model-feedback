"use strict";
exports.__esModule = true;
var Factor = /** @class */ (function () {
    function Factor(name, value) {
        if (value === void 0) { value = 0; }
        this.label = name;
        this.value = value;
    }
    return Factor;
}());
exports.Factor = Factor;
function FactorsFromJson(objArray) {
    var map = {};
    var factors = [];
    objArray.forEach(function (obj) {
        var factor = new Factor(obj.label, obj.value);
        factors.push(factor);
        map[obj.label] = factor;
    });
    return { map: map, factors: factors };
}
exports.FactorsFromJson = FactorsFromJson;
