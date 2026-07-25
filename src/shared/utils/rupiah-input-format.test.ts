import { describe, expect, it } from "vitest";
import { formatRupiahInput, parseRupiahInput } from "./rupiah-input-format";

describe("rupiah input format", () => {
  it("adds Rp. prefix and dot thousands every three digits", () => {
    expect(formatRupiahInput("100")).toBe("Rp. 100");
    expect(formatRupiahInput("1000")).toBe("Rp. 1.000");
    expect(formatRupiahInput("1000000")).toBe("Rp. 1.000.000");
  });

  it("parses formatted rupiah back to plain numeric string", () => {
    expect(parseRupiahInput("Rp. 1.000.000")).toBe("1000000");
    expect(parseRupiahInput("abc Rp. 25.000")).toBe("25000");
  });
});
