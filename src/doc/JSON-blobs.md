# Feedback model definitions

The following JSON blobs define the feedback model for the factors
(`factors`) of the model, the decision tree algorithm based on them
(`conditions` and `results`).

These blobs are up to date as of 03-26-2018.

When LARA activities are authored, each blob must be pasted into the model
definition window, where the corresponding external script is specified.  For
instance, the JSON blob for `Trap` below should be pasted into the window
where the external script is specified as `trap.js`.

In other words, **entering these JSON blobs manually is a critical part of
making the model feeback modules work**.

Followed by JSON blobs are plainer explanation of the decision tree logic.

Finally, [this website](https://jsonblob.com) is very useful when validating
JSON blobs when you need to tweak them.

# Trap

## JSON blob

```json
{
  "model1": {
    "factors": [
      {
        "label": "f_n1",
        "description": "Number many times water droplets have been followed.",
        "type": "Count"
      },
      {
        "label": "f_t1",
        "description": "How long the student spent following water droplets.",
        "type": "Timer"
      },
      {
        "label": "m_n1",
        "description": "Number of times the model has been run",
        "type": "Count"
      },
      {
        "label": "m_t1",
        "description": "Model run-time in seconds",
        "type": "Timer"
      }
    ],
    "conditions": [
      {
        "label": "C0",
        "factor": "m_n1",
        "expression": "< ",
        "value": 1,
        "yes": "MF_R1",
        "no": "C1"
      },
      {
        "label": "C1",
        "factor": "m_t1",
        "expression": "<",
        "value": 5,
        "yes": "MF_R1",
        "no": "C2"
      },
      {
        "label": "C2",
        "factor": "m_t1",
        "expression": "<=",
        "value": 100,
        "yes": "MF_R2",
        "no": "C3"
      },
      {
        "label": "C3",
        "factor": "m_n1",
        "expression": "> ",
        "value": 2,
        "yes": "NONE",
        "no": "MF_R3"
      }
    ],
    "results": [
      {
        "label": "MF_R1",
        "score": 1,
        "feedback": "Run the model and observe what happens to water as it moves underground."
      },
      {
        "label": "MF_R2",
        "score": 2,
        "feedback": "It looks like you did not spend enough time with the model! Run the model again until a pool of water reaches the surface."
      },
      {
        "label": "MF_R3",
        "score": 3,
        "feedback": "You ran the model for a long time without stopping. To make more effective observations, try stopping the model after a while and reflecting on what you have observed so far."
      },
      {
        "label": "NONE",
        "score": 4,
        "feedback": ""
      }
    ]
  },
  "model2": {
    "factors": [
      {
        "label": "f_n1",
        "description": "Number many times water droplets have been followed.",
        "type": "Count"
      },
      {
        "label": "f_t1",
        "description": "How long the student spent following water droplets.",
        "type": "Timer"
      },
      {
        "label": "m_n1",
        "description": "Number of times the model has been run",
        "type": "Count"
      },
      {
        "label": "m_t1",
        "description": "Model run-time in seconds",
        "type": "Timer"
      }
    ],
    "conditions": [
      {
        "label": "C0",
        "factor": "f_n1",
        "expression": "< ",
        "value": 1,
        "yes": "MF_F1",
        "no": "C1"
      },
      {
        "label": "C1",
        "factor": "f_t1",
        "expression": "<",
        "value": 5,
        "yes": "MF_F1",
        "no": "C2"
      },
      {
        "label": "C2",
        "factor": "f_t1",
        "expression": "<=",
        "value": 50,
        "yes": "C3",
        "no": "C4"
      },
      {
        "label": "C3",
        "factor": "f_n1",
        "expression": "< ",
        "value": 3,
        "yes": "MF_F2_F3",
        "no": "MF_F3"
      },
      {
        "label": "C4",
        "factor": "f_n1",
        "expression": "< ",
        "value": 3,
        "yes": "MF_F2",
        "no": "NONE"
      }
    ],
    "results": [
      {
        "label": "MF_F1",
        "score": 1,
        "feedback": "It looks like you did not follow any water droplets! Use the 'Follow water droplet' button to follow several water droplets in the model."
      },
      {
        "label": "MF_F2",
        "score": 2,
        "feedback": "It looks like you did not follow enough water droplets. Follow a few more water droplets."
      },
      {
        "label": "MF_F2_F3",
        "score": 3,
        "feedback": "It looks like you did not follow enough water droplets. Follow a few more water droplets for a longer amount of time! Trying following one for 15 seconds or longer."
      },
      {
        "label": "MF_F3",
        "score": 4,
        "feedback": "It looks like you did not spend enough time following water droplets. Run the model for longer and follow a few more droplets."
      },
      {
        "label": "NONE",
        "score": 5,
        "feedback": ""
      }
    ]
  }
}
```

## Plainer explanation of this decision tree

### Part 1 (model run time)

1. **Factors**
   * `m_n1`: the number of times that the model was run
   * `m_t1`: the total model run time

2. **Logic**

   * If `m_n1 < 1` or `m_t1 < 5 sec`, then `MF_R1`.
   * If `m_n1 >= 1` and  `5 sec <= m_t1 <= 100 sec`, then `MF_R2`.
   * If `1 <= m_n1 <= 2` and `m_t1 > 100 sec`, then `MF_R3`.
   * If `m_n1 > 2` and  `m_t1 > 100 sec`, then no message.

### Part 2 (follow water droplet)

1. **Factors**
   * `f_n1`: the number of time water droplets have been followed
   * `f_t1`: the total time water droplets have been followed

1. **Logic**

   * If `f_n1 < 1` or `f_t1 < 5 sec`, then `MF_F1`.
   * If `1 <= f_n1 < 3` and `5 sec <= f_t1 <= 50 sec`, then `MF_F2_F3`.
   * If `1 <= f_n1 < 3` and `f_t1 > 50`, then `MF_F2`.
   * If `f_n1 >= 3` and `5 sec <= f_t1 <= 50 sec`, then `MF_F3`.
   * If `f_n1 >= 3` and `f_t1 > 50 sec`, then no message.

# Aquifer

## JSON blob

```json
{
  "model": {
    "factors": [{
        "label": "mt",
        "description": "Model Run Time",
        "type": "Timer"
      },
      {
        "label": "rp_a",
        "description": "Rain probability average.",
        "type": "Number"
      },
      {
        "label": "rp_r",
        "description": "Rain probability range",
        "type": "Number"
      },
      {
        "label": "co",
        "description": "Confined Aquifer output",
        "type": "Number"
      },
      {
        "label": "uo",
        "description": "unConfined Aquifer output",
        "type": "Number"
      }
    ],
    "results": [{
        "label": "R0",
        "score": 1,
        "feedback": "It looks like you didn’t spend enough time with the model. Run the model for longer and compare the water levels in the two different aquifers"
      },
      {
        "label": "R1",
        "score": 2,
        "feedback": "The rain probability may be too low. Change the rain probability slider to a higher value so that the unconfined aquifer maintains a steady water level without flooding or running dry."
      },
      {
        "label": "R2",
        "score": 3,
        "feedback": "The rain probability may be too low or too high. Experiment with a wide range of rain probabilities. Make sure that the unconfined aquifer maintains a steady water level without flooding or running dry."
      },
      {
        "label": "R3",
        "score": 4,
        "feedback": "Place a well in the confined aquifer. Make sure the bottom of the well is deep enough in the water. Run the model for longer and compare the water levels in the two different aquifers."
      },
      {
        "label": "R4",
        "score": 5,
        "feedback": "Run the model a little bit longer and compare how water levels change in the two types of aquifers."
      },
      {
        "label": "R5",
        "score": 6,
        "feedback": ""
      }
    ],
    "conditions": [{
        "label": "C0",
        "factor": "mt",
        "expression": ">",
        "value": 70,
        "yes": "C1",
        "no": "R0"
      },
      {
        "label": "C1",
        "factor": "rp_a",
        "expression": ">",
        "value": 0.40,
        "yes": "C2",
        "no": "R1"
      },
      {
        "label": "C2",
        "factor": "rp_r",
        "expression": ">",
        "value": 0.3,
        "yes": "C3",
        "no": "R2"
      },
      {
        "label": "C3",
        "factor": "co",
        "expression": ">",
        "value": 4000,
        "yes": "C5",
        "no": "C4"
      },
      {
        "label": "C4",
        "factor": "co",
        "expression": ">",
        "value": 0,
        "yes": "R3",
        "no": "C5"
      },
      {
        "label": "C5",
        "factor": "uo",
        "expression": ">",
        "value": 4000,
        "yes": "R5",
        "no": "C6"
      },
      {
        "label": "C6",
        "factor": "uo",
        "expression": ">",
        "value": 0,
        "yes": "R4",
        "no": "R5"
      }
    ]
  }
}
```

## Plainer explanation of this decision tree

1. **Factors**

   * `mt`: the average model run time
   * `rp_a`: rain probability average
   * `rp_r`: rain probability range
   * `co`: water output estimate from confined aquifer
   * `uo`: water output estimate from unconfined aquifer

1. **Logic**

   * If `mt <= 70 sec`, then `R0`.
   * If `mt > 70 sec` and `rp_a <= 0.4`, then `R1`.
   * If `mt > 70 sec` and `rp_a > 0.4` and `rp_r <= 0.3`, then `R2`.
   * If `mt > 70 sec` and `rp_a > 0.4` and `rp_r > 0.3` and `0 < co <= 4000`, then `R3`.
   * If `mt > 70 sec` and `rp_a > 0.4` and `rp_r > 0.3` and `co > 4000` and
      `0 < uo <= 4000`, then `R4`.
   * If `mt > 70 sec` and `rp_a > 0.4` and `rp_r > 0.3` and ((`co > 4000` and
      `uo > 4000`) or (`co = uo = 0`)), then no message (`R5`).

   Here, the condition `co = uo = 0` captures an edge case when student never
   reloads the model, and therefore generates no log data from which water
   output can be estimated, but does other stuff well.

# Supply

## JSON blob

```json
{
  "model": {
    "factors": [{
        "label": "m_tt1",
        "description": "Model Run Time (total)",
        "type": "Timer"
      },
      {
        "label": "n_fb_rur1",
        "description": "the average number of flowback wells in the rural area.",
        "type": "Number"
      },
      {
        "label": "n_fb_urb1",
        "description": "the average number of flowback wells in the urban area",
        "type": "Number"
      },
      {
        "label": "n_nf_rur1",
        "description": "the average number of non-flowback wells in the rural area",
        "type": "Number"
      }
    ],
    "results": [{
        "label": "R0",
        "score": 1,
      "feedback": "It looks like you did not spend enough time with the model. Run the model for longer time and compare the well outputs of the urban area and the rural area."
      },
      {
        "label": "R1",
        "score": 2,
        "feedback": "There is too much water being removed from the rural area. Make sure there is only one flowback well in the rural area."
      },
      {
        "label": "R2",
        "score": 3,
        "feedback": "Remove the flowback well from the urban area but make sure there is a flowback well in the rural area. Run the model for longer and see what happens!"
      },
      {
        "label": "R3",
        "score": 4,
        "feedback": "Compare the aquifer levels in the rural area when flowback wells are used and when non-flowback wells are used.  Which well maintains a steady water level in the aquifer?"
      },
      {
        "label": "R4",
        "score": 5,
        "feedback": ""
      }
    ],
    "conditions": [{
        "label": "C0",
        "factor": "m_tt1",
        "expression": ">",
        "value": 300,
        "yes": "C1",
        "no": "R0"
      },
      {
        "label": "C1",
        "factor": "n_fb_rur1",
        "expression": "<",
        "value": 2,
        "yes": "C2",
        "no": "R1"
      },
      {
        "label": "C2",
        "factor": "n_fb_urb1",
        "expression": "<",
        "value": 0.55,
        "yes": "C3",
        "no": "R2"
      },
      {
        "label": "C3",
        "factor": "n_nf_rur1",
        "expression": ">",
        "value": 0.1,
        "yes": "R4",
        "no": "R3"
      }
    ]
  }
}
```

## Plainer explanation of this decision tree

1. **Factors**

   * `m_tt1`: the total model run time
   * `n_fb_rur1`: the average number of flow-back wells in the rural area
   * `n_fb_urb1`: the average number of flow-back wells in the urban area
   * `n_nf_rur1`: the average number of non-flow-back wells in the rural area

1. **Logic**

   * If `m_tt1 <= 300 sec`, then `R0`.
   * If `m_tt1 > 300 sec` and `n_fb_rur1 >= 2`, then `R1`.
   * If `m_tt1 > 300 sec` and `n_fb_rur1 < 2` and `n_fb_urb1 >= 0.55`, then
      `R2`.
   * If `m_tt1 > 300 sec` and `n_fb_rur1 < 2` and `n_fb_urb1 < 0.55` and
      `n_nf_rur1 <= 0.1`, then `R3`.
   * If `m_tt1 > 300 sec` and `n_fb_rur1 < 2` and `n_fb_urb1 < 0.55` and
      `n_nf_rur1 > 0.1`, then no message (`R4`).
