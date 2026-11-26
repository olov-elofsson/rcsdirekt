import { expect, test } from "bun:test";
import { expectedMigration, newestMigration } from "../scripts/cms-migration";

test("läser den sista migreringen ur listan", () => {
  const source = "export const migrations = [\n  { up: a.up, name: '20260101_a' },\n  {\n    name: '20260102_b',\n  },\n];";
  expect(newestMigration(source)).toBe("20260102_b");
  expect(newestMigration("export const migrations = []")).toBeUndefined();
  expect(expectedMigration()).toMatch(/^\d{8}_\d{6}_/);
});
