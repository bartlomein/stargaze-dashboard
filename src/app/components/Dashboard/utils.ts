import { Token } from "@/app/dashboard/[wallet]/types";

export type SortT = "asc" | "desc";

export const sortByAmountUsd = (nfts: Token[], order: SortT = "desc") => {
  return [...nfts].sort((a, b) => {
    if (a.lastSalePrice === null) return 1;
    if (b.lastSalePrice === null) return -1;
    if (b.lastSalePrice?.amountUsd && a.lastSalePrice?.amountUsd) {
      const comparison =
        b.lastSalePrice?.amountUsd - a.lastSalePrice?.amountUsd;

      return order === "asc" ? comparison : -comparison;
    }
    return 0;
  });
};

export const formatLayoutJSON = (name: string, items: any): any => {
  return JSON.stringify({ name, items });
};

export const parseLayouts = (layouts: string[]) => {
  return layouts.map((layout) => JSON.parse(layout));
};

export const stringifyLayouts = (layouts: string[]) => {
  return layouts.map((layout) => JSON.stringify(layout));
};
