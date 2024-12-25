"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "../btn-switch/LanguageSwitcher";

export default function Dropdown() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, isArabic } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
      console.log(`isarabice:${isArabic}`);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { id: 1, label: t("Home"), path: "/" },
    { id: 2, label: t("Services"), path: "/services" },
    { id: 3, label: t("About_us"), path: "/about" },
    { id: 4, label: t("Information"), path: "/Information" },
    { id: 5, label: t("Contact_Us"), path: "/contact" },
  ];

  return (
    <div className="dropdown md:hidden" ref={dropdownRef}>
      <div
        tabIndex={0}
        role="button"
        className="btn-ghost"
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-10 w-10`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      {expanded && (
        <ul
          tabIndex={0}
          className={`bg-secondary1 border absolute rounded-box z-[10] rounded p-4 shadow w-[300px] max-w-full top-full ${
            isArabic ? "right-0" : "left-0"
          }`}
          style={{
            maxWidth: "90%",
            transform: isArabic ? "translateX(0)" : "translateX(0)",
          }}
        >
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`mt-2 pb-1 px-2 nav-item ${
                pathname === item.path ? "active" : ""
              }`}
            >
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      )}
    </div>
  );
}
