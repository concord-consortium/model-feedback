## Model Feedback

Generate feedback based on user interactions from models. This repo contains Javascripts for listening to Model CC-Log-Manager Events, and providing student feedback based on how they interacted with the model.

It is inteded to be used in [LARA](https://github.com/concord-consortium/lara) as  `ExternalScript`s. These scripts must be reviewed by a LARA admin before being added to the runtime. Authors must then add one more more Model Feedback script from `lara-approved-scripts/` to the interactive page.

Warning:  This is a new and experimental feature, and is subject to rapid change.

## Details

The event stream is monitored and compared to a feedback decision tree. The decision tree is specified as JSON. See: https://model-feedback.concord.org/index.html for more details about the JSON format for feedback decision trees.

1. The CC-Log-Manager event stream is listened to for key events.
1. `Detectors` identify seqeunces of low level events, and emit new symantic events of interest.
3. `Factors` (labeled numberic values) are updated when high-level events are observed.
4. One or more `DecisionTree`s are evaluated. These trees use the state of `Factors` to evaluate  its `conditions` and determine `results`.
5. Feedback items are displayed as `results` (terminal condition nodes).

## How to work on this

1. `yarn` to install deps.
2. `webpack` to build.
2. `npm run test` to test.
3. `webpack-dev-server` to continuously build.
3. `npm run test -- --watch` to continuously run tests.

## Building ##

Branches are automatically built by Travis CI and deploye to https://model-feedback.concord.org .

## TODO

* More documentation:
  * System diagram
  * CC-Log-Manager API
  * ExternalScript API
* Confined Aquifer Model

