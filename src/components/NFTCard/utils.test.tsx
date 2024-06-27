import { formatStat } from "./utils";

describe("formatStat", () => {
  describe("Valid Input Handling", () => {
    it.each([
      ["en-US", "USD", 1234.5678, "$1,234.568"],
      ["en-US", "EUR", 987.65, "€987.65"],
      ["en-US", "JPY", 100000, "¥100,000"],
    ])(
      "formats '%s', '%s', %f correctly",
      (language, currency, number, expected) => {
        const result = formatStat(language, currency, number);
        expect(result).toBe(expected);
      }
    );

    it("rounds numbers with more than 3 decimal places", () => {
      const result = formatStat("en-US", "USD", 12345.6789012);
      expect(result).toBe("$12,345.679");
    });
  });

  describe("Edge Cases", () => {
    it("handles zero correctly", () => {
      const result = formatStat("en-US", "USD", 0);
      expect(result).toBe("$0.00");
    });

    it("handles negative numbers correctly", () => {
      const result = formatStat("en-US", "USD", -500);
      expect(result).toBe("-$500.00");
    });

    it("handles very large numbers correctly", () => {
      const result = formatStat("en-US", "USD", 1e15);

      expect(result).toMatch("$1,000,000,000,000,000.00");
    });
  });
});
