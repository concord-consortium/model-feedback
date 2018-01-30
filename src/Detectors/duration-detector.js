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
var types_1 = require("../types");
var basic_detector_1 = require("./basic-detector");
var DurationDetector = /** @class */ (function (_super) {
    __extends(DurationDetector, _super);
    function DurationDetector(start, stop, _factor) {
        var _this = _super.call(this, _factor) || this;
        _this.start = start;
        _this.stop = stop;
        return _this;
    }
    DurationDetector.prototype.handleEvent = function (event) {
        _super.prototype.handleEvent.call(this, event);
        if (this.start(event)) {
            this.lastStartTime = types_1.nTimeStamp();
        }
        if (this.stop(event)) {
            this.recordNewInterval();
        }
    };
    DurationDetector.prototype.recordNewInterval = function () {
        var now = types_1.nTimeStamp();
        var dts = (now - this.lastStartTime) / 1000;
        this.factor.value = this.factor.value + dts;
    };
    return DurationDetector;
}(basic_detector_1.BasicDetector));
exports.DurationDetector = DurationDetector;
