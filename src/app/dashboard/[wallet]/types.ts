export interface Token {
  media: Media;
  id: string;
  description?: string | null;
  lastSalePrice?: LastSalePrice | null;
}
export interface Media {
  visualAssets: VisualAssets;
}
export interface VisualAssets {
  lg: Lg;
}
export interface Lg {
  url: string;
}
export interface LastSalePrice {
  amountUsd: number;
}
