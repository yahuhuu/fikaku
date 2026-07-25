import { describe, expect, it } from "vitest";
import { getNavigationTitle } from "./navigation-labels";

describe("getNavigationTitle", () => {
  it("returns a readable title for known dashboard routes", () => {
    expect(getNavigationTitle("/dashboard")).toBe("Dashboard");
    expect(getNavigationTitle("/transactions/create")).toBe("Transactions");
    expect(getNavigationTitle("/admin/users")).toBe("Admin");
  });

  it("falls back to Fikaku for unknown routes", () => {
    expect(getNavigationTitle("/unknown")).toBe("Fikaku");
  });
});
