export const Model =
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
;
