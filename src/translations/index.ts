import { toast_ar } from "./ar/toast.ar";
import { Language } from "@/Types/adminTypes";
import { auth_ar } from "./ar/auth.ar";
import { auth_en } from "./en/auth.en";
import { nav_en } from "./en/nav.en";
import { nav_ar } from "./ar/nav.ar";
import { orders_en } from "./en/orders.en";
import { pages_en } from "./en/pages.en";
import { pages_ar } from "./ar/pages.ar";
import { toast_en } from "./en/toast.en";
import { orders_ar } from "./ar/orders.ar";

type Translations = Record<Language, Record<string, string>>;

export const translations: Translations = {
  en: {
    ...auth_en,
    ...nav_en,
    ...orders_en,
    ...pages_en,
    ...toast_en,
  },
  ar: {
    ...auth_ar,
    ...nav_ar,
    ...orders_ar,
    ...pages_ar,
    ...toast_ar,
  },
};
