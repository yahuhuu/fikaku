import { describe, expect, it } from "vitest";
import { getShellNavItems } from "./shell-navigation";

describe("getShellNavItems", () => {
  it("hides admin navigation for regular users", () => {
    expect(getShellNavItems("USER").map((item) => item.href)).not.toContain("/admin");
  });

  it("shows admin navigation for admins", () => {
    expect(getShellNavItems("ADMIN").map((item) => item.href)).toContain("/admin");
  });
});
