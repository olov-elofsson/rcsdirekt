import { expect, test } from "bun:test";
import { formatPrice, formatTotal as total, unitPrice } from "@/lib/money";

// Swedish number format uses a no-break space between thousands.
const formatTotal = (...args: Parameters<typeof total>) => total(...args).replace(/\s/g, " ");

test("the calculator total matches the unit price shown beside it, also in EUR", () => {
  expect(unitPrice("0,462 SEK", "SEK")).toBe(0.462);
  expect(unitPrice("0,462 SEK", "EUR")).toBe(0.04189);
  expect(formatPrice("0,462 SEK", "EUR")).toBe("0,04189 EUR");
  expect(formatTotal(unitPrice("0,462 SEK", "EUR") * 50_000, "EUR")).toBe("2 094,50 EUR");
  expect(formatTotal(unitPrice("0,462 SEK", "SEK") * 5_000, "SEK")).toBe("2 310 SEK");
});
