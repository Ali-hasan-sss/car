"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, Language } from "@/utils/languages";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isArabic: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language | null>(null); // اللغة تكون null أثناء التحميل

  // استرجاع اللغة المخزنة
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    setLanguageState(storedLanguage || "en"); // إذا لم يتم تخزين اللغة، يتم استخدام "en" كافتراضية
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    if (!language) return key; // تجنب الخطأ إذا لم يتم تحميل اللغة بعد
    const translation = translations[language];
    return translation[key as keyof typeof translation] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (language) {
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", language);
    }
  }, [dir, language]);

  const isArabic = language === "ar";

  if (!language) {
    // يمكن وضع شاشة تحميل هنا أو مجرد إخفاء المحتوى
    return null;
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, dir, isArabic }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
