export type SortT = "asc" | "desc";

export const sortByAmountUsd = (nfts, order: SortT = "desc") => {
  return [...nfts].sort((a, b) => {
    if (a.lastSalePrice === null) return 1;
    if (b.lastSalePrice === null) return -1;

    const comparison = b.lastSalePrice?.amountUsd - a.lastSalePrice?.amountUsd;

    return order === "asc" ? comparison : -comparison;
  });
};
