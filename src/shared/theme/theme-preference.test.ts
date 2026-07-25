import { describe, expect, it } from "vitest";
import { getNextTheme, isThemeMode, resolveStoredTheme } from "./theme-preference";

describe("theme-preference", () => {
  it("toggles light and dark mode", () => {
    expect(getNextTheme("dark")).toBe("light");
    expect(getNextTheme("light")).toBe("dark");
  });

  it("validates supported theme values", () => {
    expect(isThemeMode("dark")).toBe(true);
    expect(isThemeMode("light")).toBe(true);
    expect(isThemeMode("system")).toBe(false);
  });

  it("falls back to dark when stored value is invalid", () => {
    expect(resolveStoredTheme("light")).toBe("light");
    expect(resolveStoredTheme("invalid")).toBe("dark");
    expect(resolveStoredTheme(null)).toBe("dark");
  });
});
