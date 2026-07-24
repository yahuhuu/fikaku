import { describe, expect, it } from "vitest";
import { calculateAdminSummary } from "./get-admin-summary.service";

describe("calculateAdminSummary", () => {
  it("summarizes users and subscription statuses", () => {
    const summary = calculateAdminSummary([
      { plan: "FREE", status: "ACTIVE" },
      { plan: "PRO", status: "ACTIVE" },
      { plan: "PRO", status: "CANCELED" },
    ]);

    expect(summary).toEqual({
      totalUsers: 3,
      activeSubscriptions: 2,
      freeUsers: 1,
      proUsers: 2,
      businessUsers: 0,
    });
  });
});
