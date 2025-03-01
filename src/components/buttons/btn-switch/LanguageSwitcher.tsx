import React, { useEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";
import { ChevronDown } from "lucide-react";

type Language = "en" | "ar";

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.auth.lang);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // ✅ تحسين إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) // ✅ تأكد من أن النقر ليس على الزر
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

  return (
    <div className="relative">
      {/* زر التبديل */}
      <button
        ref={buttonRef} // ✅ إضافة مرجع للزر لمنع إغلاقه عند النقر عليه
        onClick={toggleDropdown}
        className="flex gap-1 items-center text-gray-500 justify-center rounded-full focus:outline-none"
        aria-label="Change language"
      >
        <FaGlobe className="text-xl mx-1" />
        {language === "en" ? "English" : "العربية"}
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </button>

      {/* القائمة المنسدلة */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef} // ✅ مرجع للقائمة
          className="absolute right-0 z-50 mt-4 w-32 bg-secondary1 border rounded shadow-md"
        >
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                dispatch(setLanguage(lang.code as Language));
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
