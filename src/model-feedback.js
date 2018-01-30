"use strict";
exports.__esModule = true;
var ReactDOM = require("react-dom");
var React = require("react");
var feedback_view_1 = require("./components/feedback-view");
var configuration_view_1 = require("./components/configuration-view");
var factor_1 = require("./factor");
var count_detector_1 = require("./Detectors/count-detector");
var duration_detector_1 = require("./Detectors/duration-detector");
var hee_sun_one_1 = require("./models/hee-sun-one");
var decision_tree_1 = require("./decision-tree");
var ModelFeedback = /** @class */ (function () {
    function ModelFeedback(conf, context) {
        this.description = "Collect Model Events, provide feedback";
        this.name = "ModelFeedback";
        console.dir(context);
        console.dir(conf);
        this.loggers = [];
        this.createFactorMap(hee_sun_one_1.Model);
        // this.dtModelTime = DecisionTreeFromJson(JSON.parse(modelOne));
        // this.dtDropletTime = DecisionTreeFromJson(JSON.parse(modelTwo));
        this.dtModelTime = decision_tree_1.DecisionTreeFromJson(conf.model1);
        this.dtDropletTime = decision_tree_1.DecisionTreeFromJson(conf.model2);
        var startModel = function (e) { return e.event === "StartedModel"; };
        var ReloadedModel = function (e) { return e.event === "ReloadedModel"; };
        var stopModel = function (e) {
            return e.event === "StoppedModel" || e.event === "ReloadedModel";
        };
        var startFollow = function (e) {
            return e.event === "ButtonClicked" && e.parameters.label === "Follow water droplet";
        };
        var stopFollow = function (e) {
            return (e.event === "ButtonClicked" && e.parameters.label === "Stop following") ||
                (e.event === "ReloadedMode");
        };
        this.detectors = [
            new count_detector_1.CountDetector(startModel, this.map.m_n1),
            new count_detector_1.CountDetector(ReloadedModel, new factor_1.Factor("reload count")),
            new count_detector_1.CountDetector(startFollow, this.map.f_n1),
            new duration_detector_1.DurationDetector(startModel, stopModel, this.map.m_t1),
            new duration_detector_1.DurationDetector(startFollow, stopFollow, this.map.f_t1)
        ];
        this.setupReactView();
    }
    ModelFeedback.config = function (context) {
        window.alert("Something good");
        var textbox = context.div;
        var config = context.config;
        var jquery = window.$;
        var reactDiv = jquery('<div id="reactTarget">');
        textbox.parent().addChild(reactDiv);
        var onComplete = function () { return null; };
        var configView = React.createElement(configuration_view_1.ConfigurationView, { value: {}, schema: {}, onComplete: onComplete }, null);
        // (jqDiv as Element).appendChild(reactContainer);
        ReactDOM.render(configView, reactDiv[0]);
    };
    ModelFeedback.prototype.createFactorMap = function (json) {
        this.map = factor_1.FactorsFromJson(JSON.parse(json).factors).map;
    };
    ModelFeedback.prototype.updateDiv = function (msg) {
        this.div.innerHTML = msg;
    };
    ModelFeedback.prototype.addLogger = function (logger) {
        this.loggers.push(logger);
    };
    ModelFeedback.prototype.log = function (event) {
        this.loggers.forEach(function (logger) {
            logger.log(event);
        });
    };
    ModelFeedback.prototype.handleEvent = function (event) {
        var _this = this;
        this.detectEvents(event);
        this.reportEvent(event);
        if (event.event === "arg-block submit") {
            var feedbackOne = this.dtModelTime.evaluate(this.map).feedback;
            var feedbackTwo = this.dtDropletTime.evaluate(this.map).feedback;
            var factorNames = Object.getOwnPropertyNames(this.map);
            var factors = factorNames.map(function (key) { return _this.map[key]; });
            this.feedbackView.setState({
                showing: true,
                feedbackItems: [feedbackOne, feedbackTwo],
                factors: factors
            });
        }
    };
    ModelFeedback.prototype.detectEvents = function (event) {
        this.detectors.forEach(function (detector) {
            detector.handleEvent(event);
        });
    };
    ModelFeedback.prototype.reportEvent = function (event) {
        console.group('TestInstrument log');
        console.dir(event);
        console.groupEnd();
        var msg = event.time + " : " + event.event;
        this.detectors.forEach(function (detector) {
            console.log(detector.factor.label + " " + detector.factor.value);
        });
    };
    ModelFeedback.prototype.setupReactView = function () {
        var reactContainer = document.createElement("div");
        var argblock = document.querySelector(".arg-block");
        argblock.appendChild(reactContainer);
        var element = React.createElement(feedback_view_1.FeedbackView, { chanel: 'joe' }, null);
        this.feedbackView = ReactDOM.render(element, reactContainer);
    };
    return ModelFeedback;
}());
exports.ModelFeedback = ModelFeedback;
