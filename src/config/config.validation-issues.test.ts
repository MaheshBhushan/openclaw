import { describe, expect, it } from "vitest";
import { validateConfigObjectRaw } from "./validation.js";

describe("config validation issue formatting", () => {
  it("surfaces strict object keys for union branches", () => {
    const result = validateConfigObjectRaw({
      channels: {
        telegram: {
          capabilities: {
            inlineButtons: "all",
            agent: "claude",
          },
        },
      },
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      const strictIssue = result.issues.find(
        (issue) =>
          issue.path === "channels.telegram.capabilities" &&
          issue.message.toLowerCase().includes("unrecognized"),
      );
      expect(strictIssue).toBeDefined();
      expect(strictIssue?.message).toContain("agent");
    }
  });
});
