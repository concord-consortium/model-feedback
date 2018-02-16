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
        "feedback": "Run the model longer."
      },
      {
        "label": "R1",
        "score": 2,
        "feedback": "Experiment with higher Rain probability"
      },
      {
        "label": "R2",
        "score": 3,
        "feedback": "Experiment with different rain probabilities"
      },
      {
        "label": "R3",
        "score": 4,
        "feedback": "Try some deeper wells"
      },
      {
        "label": "R4",
        "score": 5,
        "feedback": "Compare deep water wells with more shallow wells."
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
        "value": 8000,
        "yes": "C4",
        "no": "R3"
      },
      {
        "label": "C4",
        "factor": "uo",
        "expression": ">",
        "value": 4000,
        "yes": "R5",
        "no": "R4"
      }
    ]
  }
}
;
