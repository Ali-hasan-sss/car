import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { FaGlobe } from "react-icons/fa";

type Language = "en" | "ar";

export default function LanguageSwitcher() {
  const { setLanguage, language } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  //click outsied menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const availableLanguages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* Globe Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex gap-1 items-center text-gray-500 jystify-center rounded-full focus:outline-none"
        aria-label="Change language"
      >
        <FaGlobe className="text-xl mx-1" />
        {t("language")} <img src="/images/down.png" alt="down" />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 z-50  mt-4 w-32 bg-secondary1 border rounded shadow-lg">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as Language);
                setIsDropdownOpen(false);
              }}
              disabled={language === lang.code}
              className={`w-full px-4 py-2 rounded text-left ${
                language === lang.code
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-primary1"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
