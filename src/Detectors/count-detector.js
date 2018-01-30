"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var basic_detector_1 = require("./basic-detector");
var CountDetector = /** @class */ (function (_super) {
    __extends(CountDetector, _super);
    function CountDetector(_matcher, _factor) {
        var _this = _super.call(this, _factor) || this;
        _this.matcher = _matcher;
        return _this;
    }
    CountDetector.prototype.handleEvent = function (event) {
        if (this.matcher(event)) {
            this.factor.value = this.factor.value + 1;
        }
        _super.prototype.handleEvent.call(this, event);
    };
    return CountDetector;
}(basic_detector_1.BasicDetector));
exports.CountDetector = CountDetector;
