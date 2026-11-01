import { expect, test } from "bun:test";
import { customerReferences } from "../src/data/customer-references";

test("kundreferenserna innehåller endast de fyra valda företagen", () => {
  expect(customerReferences.map((customer) => customer.name)).toEqual([
    "Nercia", "Bilia", "Maptun", "Deligate",
  ]);
});