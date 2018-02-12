export const schema = {
  type: "object",
  properties: {
    model1: {
      type: "object",
      properties: {
        factors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              description: { type: "string" },
              type: { type: "string" }
            },
          }
        },
        conditions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              factor: { type: "string" },
              expression: { type: "string" },
              value: { type: "number" },
              yes: { type: "string" },
              no: { type: "string" }
            }
          }
        },
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              score: { type: "number" },
              feedback: { type: "string" }
            }
          }
        }
      }
    }
  }
};
