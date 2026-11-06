import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

// Exercise the component's actual pure functions without importing browser assets.
const source = readFileSync(new URL("../src/components/rcs-video/RcsVideoGenerator.tsx", import.meta.url), "utf8");
const functions = source.slice(source.indexOf("const consentSuggestions ="), source.indexOf("// ---------- hjälpfunktioner"));
const calculation = source.match(/const consent = [^;]+;/)?.[0];
if (!calculation) throw new Error("Missing effective consent calculation");
const js = new Bun.Transpiler({ loader: "ts" }).transformSync(functions + `\nfunction generate(form) { ${calculation} return launchTexts({ ...form, consent }, makeFlow(form)); }`);
const generate = new Function(js + "; return generate;")();
const form = { displayName: "Test", brand: "Test AB", description: "", color: "", logo: "", banner: "", phone: "", phoneLabel: "", web: "https://example.com", webLabel: "", email: "", emailLabel: "", contactPerson: "", contactRole: "", contactEmail: "", consent: "" };

test("empty consent defaults to unchecked website form checkbox in opt-in details", () => {
  const text = generate(form).find((row: any) => row.label === "Opt-in details").text;
  expect(text).toContain("Recipients opt in by ticking an unchecked checkbox for SMS/RCS messages when they fill in a form on https://example.com.");
});
test("custom consent is preserved instead of the default", () => {
  const text = generate({ ...form, consent: "  by giving written permission  " }).find((row: any) => row.label === "Opt-in details").text;
  expect(text).toContain("Recipients opt in by giving written permission.");
  expect(text).not.toContain("by ticking an unchecked checkbox");
});