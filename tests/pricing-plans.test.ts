import { expect, test } from "bun:test";

import { pricingCountries, pricingCurrencies, pricingPlans, pricingTerms } from "../src/data/pricing-plans";

test("priserna är frånpriser, inte fasta priser", () => {
  expect(pricingTerms.basis).toBe("starting-at");
});

test("prissättningen beror på volym och business case", () => {
  expect(pricingTerms.factors).toEqual(["volume", "business-case"]);
});

test("meddelandetyperna har rätt styckpris", () => {
  const prices = Object.fromEntries(pricingPlans.map((plan) => [plan.name, plan.price]));
  expect(prices).toEqual({
    "RCS Basic": "0,30 SEK",
    "RCS Single": "0,425 SEK",
    "RCS Conversation": "0,63 SEK",
  });
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
  }
});
