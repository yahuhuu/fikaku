import { describe, expect, it } from "vitest";
import { getSettingsNavItems, getShellNavItems, isSettingsMenuPath } from "./shell-navigation";

describe("getShellNavItems", () => {
  it("keeps the main menu focused on primary finance pages", () => {
    expect(getShellNavItems("USER").map((item) => item.href)).toEqual(["/dashboard", "/transactions", "/wallets", "/reports"]);
  });

  it("keeps categories and families inside the settings menu", () => {
    expect(getSettingsNavItems().map((item) => item.href)).toEqual(["/settings", "/categories", "/families", "/subscriptions"]);
  });

  it("detects pages that should show the settings menu", () => {
    expect(isSettingsMenuPath("/settings")).toBe(true);
    expect(isSettingsMenuPath("/categories")).toBe(true);
    expect(isSettingsMenuPath("/families")).toBe(true);
    expect(isSettingsMenuPath("/dashboard")).toBe(false);
  });
});
