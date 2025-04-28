"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLanguage } from "@/store/slice/authSlice";
import { Language } from "@/Types/adminTypes";
import { translations } from "@/translations";

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
  const dispatch = useDispatch();
  const storedLanguage = useSelector(
    (state: RootState) => state.auth.lang
  ) as Language;

  // ✅ لا تحدد أي لغة قبل تحميل `storedLanguage`
  const [language, setLanguageState] = useState<Language | null>(null);

  useEffect(() => {
    if (storedLanguage) {
      setLanguageState(storedLanguage);
    }
  }, [storedLanguage]);

  const changeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[language || "ar"]; // استخدام "ar" كافتراضية لتجنب الأخطاء
    return translation[key as keyof typeof translation] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";
  const isArabic = language === "ar";

  useEffect(() => {
    if (language) {
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", language);
    }
  }, [dir, language]);

  // ✅ منع عرض المحتوى حتى تحميل اللغة
  if (!language) {
    return null;
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: changeLanguage, t, dir, isArabic }}
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
