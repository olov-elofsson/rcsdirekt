import { expect, test } from "bun:test";

import { pricingCountries, pricingCurrencies, pricingPlans } from "../src/data/pricing-plans";

const amount = (price: string) => Number(price.replace(" SEK", "").replace(",", "."));

test("meddelandetyperna finns i rätt ordning", () => {
  expect(pricingPlans.map((plan) => plan.name)).toEqual(["RCS Basic", "RCS Single", "RCS Conversation"]);
});

test("från-priset är det lägsta listpriset per operatör", () => {
  for (const plan of pricingPlans) {
    if (!plan.operatorPrices?.length) continue;
    const lowest = Math.min(...plan.operatorPrices.map((row) => amount(row.price)));
    expect(amount(plan.price)).toBe(lowest);
  }
});

test("bara RCS Single märks som Populärast", () => {
  const badged = pricingPlans.filter((plan) => plan.badge);
  expect(badged.map((plan) => [plan.name, plan.badge])).toEqual([["RCS Single", "Populärast"]]);
});

test("bara Sverige kan väljas som land", () => {
  expect(pricingCountries.filter((country) => country.available).map((country) => country.code)).toEqual(["SE"]);
});

test("SEK är enda valbara valuta och används i alla priser", () => {
  const available = pricingCurrencies.filter((currency) => currency.available).map((currency) => currency.code);
  expect(available).toEqual(["SEK"]);
  for (const plan of pricingPlans) {
    expect(plan.price.endsWith(" SEK")).toBe(true);
    for (const row of plan.operatorPrices ?? []) expect(row.price.endsWith(" SEK")).toBe(true);
  }
});
