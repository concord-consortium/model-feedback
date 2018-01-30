
export const Model:string = `{
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
    {"label": "C3", "factor": "m_n1", "expression": "> ", "value": 2,  "yes": "NONE",  "no": "MF_R1"}
  ],
  "results": [
    {"label": "MF_R1", "score": 1, "feedback": "Run the model and observe what happens to water as it moves underground."},
    {"label": "MF_R2", "score": 2, "feedback": "It looks like you didn't spend enough time with the model! Run the model again  until a pool of water reaches the surface."},
    {"label": "NONE", "score": 3, "feedback": ""}
  ]
}`;
