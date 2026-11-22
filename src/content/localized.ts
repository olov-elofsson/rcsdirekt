// Content parts in the page's language: the CMS text in Swedish, the translation under /en.
import { useLocale } from "@/lib/i18n";
import { priser as priserEn } from "./en/priser";
import { startsida as startsidaEn } from "./en/startsida";
import { priser as priserSv } from "./priser";
import { startsida as startsidaSv } from "./startsida";

export const useStartsida = () => (useLocale() === "en" ? startsidaEn : startsidaSv);
export const usePriser = () => (useLocale() === "en" ? priserEn : priserSv);
