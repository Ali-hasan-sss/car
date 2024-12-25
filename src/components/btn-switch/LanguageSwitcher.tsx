import React, { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { FaGlobe } from "react-icons/fa";

// تأكد أن الـ Language يحتوي على الرموز المتاحة
type Language = "en" | "ar";

const LanguageSwitcher: React.FC = () => {
  const { setLanguage, language } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableLanguages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      {/* Globe Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center p-1 rounded-full focus:outline-none"
        aria-label="Change language"
      >
        <FaGlobe className="text-xl" />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-4 w-32 bg-secondary1 border rounded shadow-lg">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as Language); // Language is updated and saved in the context
                setIsDropdownOpen(false); // Close dropdown
              }}
              disabled={language === lang.code}
              className={`w-full px-4 py-2 text-left ${
                language === lang.code
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
