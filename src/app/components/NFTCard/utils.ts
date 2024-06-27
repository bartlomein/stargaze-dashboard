type LanguageT = "en-US";
type CurrencyT = "USD" | "EUR" | "JPY";

export const formatStat = (
  language: LanguageT,
  currency: CurrencyT,
  number: number
) => {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 3,
  }).format(number);
};
