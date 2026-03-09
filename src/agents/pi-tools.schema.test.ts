import { describe, expect, it } from "vitest";
import { normalizeToolParameters } from "./pi-tools.schema.js";

describe("normalizeToolParameters", () => {
  it("normalizes null required fields to arrays", () => {
    const normalized = normalizeToolParameters(
      {
        name: "test-tool",
        label: "test-tool",
        description: "test",
        parameters: {
          type: "object",
          required: null,
          properties: {
            payload: {
              type: "object",
              required: null,
              properties: {
                id: { type: "string" },
              },
            },
          },
        },
        execute: async () => ({ content: [{ type: "text", text: "ok" }], details: {} }),
      },
      { modelProvider: "openai" },
    );

    const params = normalized.parameters as {
      required?: unknown;
      properties?: { payload?: { required?: unknown } };
    };
    expect(params.required).toEqual([]);
    expect(params.properties?.payload?.required).toEqual([]);
  });
});
