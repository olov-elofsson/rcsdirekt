// List prices are kept in SEK. The supplier's price list is in EUR (per 100 messages) and was
// converted at 11.03 SEK per EUR without a mark-up, so EUR is shown by converting back at the same
// rate: the euro prices are then exactly the supplier's list prices per message.
import { createContext, useContext } from "react";

export const SEK_PER_EUR = 11.03;

export type Currency = "SEK" | "EUR";

/** "0,316 SEK" → 0.316. */
export const priceNumber = (price: string) => Number.parseFloat(price.replace(/[^\d,.]/g, "").replace(",", "."));

const inCurrency = (sek: number, currency: Currency) => (currency === "EUR" ? sek / SEK_PER_EUR : sek);

/** The per-message list price as shown: three decimals in SEK, at most five in EUR (the supplier's own precision). */
export function unitPrice(sekPrice: string, currency: Currency): number {
  // Rounded to six places first, so float noise does not tip a 5 the wrong way.
  const exact = Math.round(inCurrency(priceNumber(sekPrice), currency) * 1e6) / 1e6;
  return Number(exact.toFixed(currency === "EUR" ? 5 : 3));
}

/** A per-message list price in the chosen currency. */
export function formatPrice(sekPrice: string, currency: Currency, { locale = "sv-SE", unit = true }: { locale?: string; unit?: boolean } = {}): string {
  const [min, max] = currency === "EUR" ? [4, 5] : [3, 3];
  const value = unitPrice(sekPrice, currency).toLocaleString(locale, { minimumFractionDigits: min, maximumFractionDigits: max });
  return unit ? `${value} ${currency}` : value;
}

/** A total already in the chosen currency (unit price × count): whole kronor, or euros with cents. */
export function formatTotal(amount: number, currency: Currency, locale = "sv-SE"): string {
  const digits = currency === "EUR" ? 2 : 0;
  return `${amount.toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits })} ${currency}`;
}

/** The currency prices are shown in; SEK unless a page offers another. */
export const CurrencyContext = createContext<Currency>("SEK");
export const useCurrency = () => useContext(CurrencyContext);
