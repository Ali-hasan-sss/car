"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";

// تعريف واجهة السياق
interface AppContextProps {
  isDarkMode: boolean;
  isArabic: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
}

// إنشاء السياق
export const AppContext = createContext<AppContextProps>({
  isDarkMode: false,
  isArabic: false,
  toggleDarkMode: () => {},
  toggleLanguage: () => {},
});

// مزود السياق
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  // جلب القيم من localStorage عند التحميل الأول
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLanguage = localStorage.getItem("language") || "en";

    setIsDarkMode(savedTheme === "dark");
    setIsArabic(savedLanguage === "ar");

    // تحديث الخصائص في html
    //document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.setAttribute("lang", savedLanguage);
    document.documentElement.setAttribute(
      "dir",
      savedLanguage === "ar" ? "rtl" : "ltr"
    );
  }, []);

  // التبديل بين الوضع الليلي والنهاري
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  // التبديل بين اللغتين
  const toggleLanguage = () => {
    const newLanguage = isArabic ? "en" : "ar";
    setIsArabic(!isArabic);
    localStorage.setItem("language", newLanguage);
    document.documentElement.setAttribute("lang", newLanguage);
    document.documentElement.setAttribute(
      "dir",
      newLanguage === "ar" ? "rtl" : "ltr"
    );
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        isArabic,
        toggleDarkMode,
        toggleLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
