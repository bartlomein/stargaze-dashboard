import {
  formatLayoutJSON,
  parseLayouts,
  sortByAmountUsd,
  stringifyLayouts,
} from "./utils";

interface Token {
  lastSalePrice?: {
    amountUsd?: number;
  };
}

describe("sortByAmountUsd", () => {
  const testTokens: Token[] = [
    { lastSalePrice: { amountUsd: 100 } },
    { lastSalePrice: { amountUsd: 50 } },
    { lastSalePrice: { amountUsd: 150 } },
    { lastSalePrice: null },
  ];

  it("sorts in descending order (default)", () => {
    const sorted = sortByAmountUsd(testTokens);
    expect(sorted.map((t) => t.lastSalePrice?.amountUsd)).toEqual([
      50,
      100,
      150,
      undefined,
    ]);
  });

  it("sorts in ascending order", () => {
    const sorted = sortByAmountUsd(testTokens, "asc");
    expect(sorted.map((t) => t.lastSalePrice?.amountUsd)).toEqual([
      150,
      100,
      50,
      undefined,
    ]);
  });

  it("handles null sale prices correctly", () => {
    const sorted = sortByAmountUsd(testTokens);
    const nullTokens = sorted.filter((t) => t.lastSalePrice === null);
    expect(nullTokens).toHaveLength(1); // Should still contain the null token
  });
});

describe("formatLayoutJSON", () => {
  it("formats JSON correctly", () => {
    const items = [{ id: 1 }, { id: 2 }];
    const result = formatLayoutJSON("testLayout", items);
    expect(result).toBe('{"name":"testLayout","items":[{"id":1},{"id":2}]}');
  });
});

describe("parseLayouts", () => {
  it("parses JSON layout strings correctly", () => {
    const layouts = [
      '{"name":"layout1","items":[1,2,3]}',
      '{"name":"layout2","items":["a","b"]}',
    ];
    const result = parseLayouts(layouts);
    expect(result).toEqual([
      { name: "layout1", items: [1, 2, 3] },
      { name: "layout2", items: ["a", "b"] },
    ]);
  });

  it("throws an error for invalid JSON", () => {
    const layouts = ['{"name":"layout1"}', "invalid json"];
    expect(() => parseLayouts(layouts)).toThrowError();
  });
});

describe("stringifyLayouts", () => {
  it("stringifies layouts correctly", () => {
    const layouts = [
      { name: "layout1", items: [1, 2, 3] },
      { name: "layout2", items: ["a", "b"] },
    ];
    const result = stringifyLayouts(layouts);
    expect(result).toEqual([
      '{"name":"layout1","items":[1,2,3]}',
      '{"name":"layout2","items":["a","b"]}',
    ]);
  });
});
