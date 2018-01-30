"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var BasicDetector = /** @class */ (function () {
    function BasicDetector(_factor, _handlers) {
        if (_handlers === void 0) { _handlers = []; }
        this.factor = _factor;
        this.eventHandlers = _handlers;
    }
    BasicDetector.prototype.handleEvent = function (event) {
        if (event.event === types_1.RESET) {
            this.factor.value = 0;
        }
    };
    BasicDetector.prototype.addHandler = function (handler) {
        this.eventHandlers.push(handler);
    };
    BasicDetector.prototype.emit = function (evt) {
        this.eventHandlers.forEach(function (handler) {
            handler(evt);
        });
    };
    return BasicDetector;
}());
exports.BasicDetector = BasicDetector;
