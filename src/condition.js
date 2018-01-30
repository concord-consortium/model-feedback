"use strict";
exports.__esModule = true;
var Condition = /** @class */ (function () {
    function Condition(label, factor, expression, value, yes, no) {
        this.label = label;
        this.factor = factor;
        this.expression = expression;
        this.value = value;
        this.yes = yes;
        this.no = no;
    }
    Condition.prototype.eval = function (factors) {
        var factor = factors[this.factor].value;
        // TODO: use Jexl or other `eval` alternative
        // tslint:disable-next-line:no-eval
        return eval("factor " + this.expression + " " + this.value);
    };
    return Condition;
}());
exports.Condition = Condition;
function ConditionFromJson(obj) {
    return new Condition(obj.label, obj.factor, obj.expression, obj.value, obj.yes, obj.no);
}
exports.ConditionFromJson = ConditionFromJson;
