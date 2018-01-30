## model-feedback##

Generate feedback based on user interactions from models.


## Details ##

1. Log (event) stream is monitored for known interactions.
2. High level events are extracted from the event stream.
3. Factors (labeled variables) are incremented when high-level interactions are observed.
4. DecisionTree evaluates Conditions (which look at Factors) to determine Results.

(more TBD)


## Developing ##

`yarn` to install deps.
`webpack` to build.
`npm run test` to test.
`webpack-dev-server` to continuously build.
`npm run test -- --watch` to continuously run tests.

☮
