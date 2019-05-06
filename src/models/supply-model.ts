export const Model =
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
        "feedback": "Make sure that there is no flowback well in the urban area but there is a flowback well in the rural area.  Run the model for longer time and see what happens!"
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
;
