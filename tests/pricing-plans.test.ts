import { expect, test } from "bun:test";

import { pricingPlans } from "../src/data/pricing-plans";

test("meddelandetyperna har rätt styckpris", () => {
  const prices = Object.fromEntries(pricingPlans.map((plan) => [plan.name, plan.price]));
  expect(prices).toEqual({
    "RCS Basic": "0,49 SEK",
    "RCS Single": "0,69 SEK",
    "RCS Conversation": "0,99 SEK",
  });
});

test("bara RCS Single märks som Populärast", () => {
  const badged = pricingPlans.filter((plan) => plan.badge);
  expect(badged.map((plan) => [plan.name, plan.badge])).toEqual([["RCS Single", "Populärast"]]);
});
