import { expect, test } from "bun:test";
import { inquirySchema } from "../src/lib/inquiries/schema";
import { bucketKey, swedishRedirect } from "../src/server";

test("bucketKey maps /media/ names to cms-media and refuses paths", () => {
  expect(bucketKey("/media/logo.png")).toBe("cms-media/logo.png");
  expect(bucketKey("/media/a%20b.svg")).toBe("cms-media/a b.svg");
  expect(bucketKey("/media/..%2Fsecret")).toBeNull();
  expect(bucketKey("/media/.env")).toBeNull();
  expect(bucketKey("/media/%E0")).toBeNull();
  expect(bucketKey("/priser")).toBeUndefined();
});

test("inquirySchema requires what each form needs", () => {
  const person = { name: "Ann", company: "", email: "ann@example.se", phone: "", message: "" };
  expect(inquirySchema("contact").safeParse(person).success).toBe(false);
  expect(inquirySchema("contact").safeParse({ ...person, message: "Hej" }).success).toBe(true);
  expect(inquirySchema("signup").safeParse({ ...person, company: "AB", terms: "on" }).success).toBe(true);
  expect(inquirySchema("signup").safeParse({ ...person, company: "AB" }).success).toBe(false);
  expect(inquirySchema("webinar").safeParse(person).success).toBe(true);
  expect(inquirySchema("contact").safeParse({ ...person, message: "x".repeat(1001) }).success).toBe(false);
});

test("old English addresses lead to the Swedish page", () => {
  expect(swedishRedirect("/en")).toBe("/");
  expect(swedishRedirect("/en/pricing")).toBe("/priser");
  expect(swedishRedirect("/en/blog/vad-ar-rcs")).toBe("/blogg/vad-ar-rcs");
  expect(swedishRedirect("/en/sign-up/")).toBe("/skapa-konto");
  expect(swedishRedirect("/en/okand")).toBe("/");
  expect(swedishRedirect("/engelska")).toBeUndefined();
  expect(swedishRedirect("/priser")).toBeUndefined();
});
