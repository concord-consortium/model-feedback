
export const Model:string = `
{
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
    {"label": "MF_F1",    "score": 1, "feedback": "It looks like you didn't follow any water droplets! Use the 'Follow water droplet' button to follow several water droplets in the model."},
    {"label": "MF_F2",    "score": 2, "feedback": "It looks like you didn't follow enough water droplets. Follow a few more water droplets."},
    {"label": "MF_F2_F3", "score": 3, "feedback": "It looks like you didn't follow enough water droplets. Follow a few more water droplets. It looks like you did not spend enough time following the water droplet! Follow it for 15 seconds or longer.."},
    {"label": "MF_F3",    "score": 4, "feedback": "It looks like you did not spend enough time following the water droplet! Follow it for 15 seconds or longer.."},
    {"label": "NONE",     "score": 5, "feedback": ""}
  ]
}
`;

