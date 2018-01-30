"use strict";
exports.__esModule = true;
var Result = /** @class */ (function () {
    function Result(label, feedback, score) {
        if (score === void 0) { score = 0; }
        this.label = label;
        this.feedback = feedback;
        this.score = score;
    }
    return Result;
}());
exports.Result = Result;
function ResultFromJson(obj) {
    return new Result(obj.label, obj.feedback, obj.score);
}
exports.ResultFromJson = ResultFromJson;
