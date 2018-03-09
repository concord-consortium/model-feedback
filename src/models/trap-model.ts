
export const Model:string = `
{
  "model1":
    {
      "factors": [
        {"label": "f_n1", "description": "Number many times water droplets have been followed.", "type": "Count"},
        {"label": "f_t1", "description": "How long the student spent following water droplets.", "type": "Timer"},
        {"label": "m_n1", "description": "Number of times the model has been run", "type": "Count"},
        {"label": "m_t1", "description": "Model run-time in seconds", "type": "Timer"}
      ],
      "conditions": [
        {"label": "C0", "factor": "m_n1", "expression": "< ", "value": 1,  "yes": "MF_R1", "no": "C1"},
        {"label": "C1", "factor": "m_t1", "expression": "<",  "value": 5,  "yes": "MF_R1", "no": "C2"},
        {"label": "C2", "factor": "m_t1", "expression": "<=", "value": 100,"yes": "MF_R2", "no": "C3"},
        {"label": "C3", "factor": "m_n1", "expression": "> ", "value": 2,  "yes": "NONE",  "no": "MF_R3"}
      ],
      "results": [
        {"label": "MF_R1", "score": 1, "feedback": "Run the model and observe what happens to water as it moves underground."},
        {"label": "MF_R2", "score": 2, "feedback": "It looks like you did not spend enough time with the model! Run the model again  until a pool of water reaches the surface."},
        {"label": "MF_R3", "score": 3, "feedback": "It looks like you ran the model long enough, but you let the model run in a long stretch.  For making effective observations, it may help if you stop the simulation after a while, reflect on what you observed so far, and then restart or reload the simulation."},
        {"label": "NONE", "score": 4, "feedback": ""}
      ]
    },
  "model2": {
      "factors": [
        {"label": "f_n1", "description": "Number many times water droplets have been followed.", "type": "Count"},
        {"label": "f_t1", "description": "How long the student spent following water droplets.", "type": "Timer"},
        {"label": "m_n1", "description": "Number of times the model has been run", "type": "Count"},
        {"label": "m_t1", "description": "Model run-time in seconds", "type": "Timer"}
      ],
      "conditions": [
        {"label": "C0", "factor": "f_n1", "expression": "< ", "value": 1,   "yes": "MF_F1",     "no": "C1"},
        {"label": "C1", "factor": "f_t1", "expression": "<",  "value": 5,   "yes": "MF_F1",     "no": "C2"},
        {"label": "C2", "factor": "f_t1", "expression": "<=", "value": 200, "yes": "C3",        "no": "C4"},
        {"label": "C3", "factor": "f_n1", "expression": "< ", "value": 3,   "yes": "MF_F2_F3",  "no": "MF_F3"},
        {"label": "C4", "factor": "f_n1", "expression": "< ", "value": 3,   "yes": "MF_F2",     "no": "NONE"}
      ],
      "results": [
        {"label": "MF_F1",    "score": 1, "feedback": "It looks like you did not follow any water droplets! Use the 'Follow water droplet' button to follow several water droplets in the model."},
        {"label": "MF_F2",    "score": 2, "feedback": "It looks like you did not follow enough water droplets. Follow a few more water droplets."},
        {"label": "MF_F2_F3", "score": 3, "feedback": "It looks like you did not follow enough water droplets. Follow a few more water droplets. It looks like you did not spend enough time following the water droplet! Follow it for 15 seconds or longer.."},
        {"label": "MF_F3",    "score": 4, "feedback": "It looks like you did not spend enough time following water droplets. Run the model for longer and follow a few more droplets."},
        {"label": "NONE",     "score": 5, "feedback": ""}
      ]
    }
  }
`;
