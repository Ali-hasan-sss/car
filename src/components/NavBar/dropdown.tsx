"use client";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "../buttons/btn-switch/LanguageSwitcher";
import Search from "./top-bar/Search-form";

export default function Dropdown() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const { t, isArabic } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (expanded && menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      // Adjust position if menu goes outside the screen
      if (menuRect.right > windowWidth) {
        menuRef.current.style.right = "0";
        menuRef.current.style.left = "auto";
      } else if (menuRect.left < 0) {
        menuRef.current.style.left = "0";
        menuRef.current.style.right = "auto";
      }
    }
  }, [expanded]);

  //close the dropdown when language is changed
  useEffect(() => {
    setExpanded(false);
  }, [isArabic]);

  const navItems = [
    { id: 1, label: t("Home"), path: "/" },
    { id: 2, label: t("Services"), path: "/services" },
    { id: 3, label: t("About_us"), path: "/about" },
    { id: 4, label: t("bloge"), path: "/blog" },
    { id: 5, label: t("Car Store"), path: "/car-store" },
    { id: 6, label: t("Contact_Us"), path: "/contact" },
  ];

  return (
    <div className="relative md:hidden p-1" ref={dropdownRef}>
      <div
        tabIndex={0}
        role="button"
        className="btn-ghost mb-2"
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-10 w-10 mt-2`}
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
          ref={menuRef}
          tabIndex={0}
          className={`bg-secondary1 absolute border p-4 z-[50] rounded shadow w-[250px] top-full`}
          style={{
            left: "0", // أو right: "0" حسب اللغة أو الاتجاه
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
          <li className="mt-2 w-full">
            <Search width="full" />
          </li>
          <li className="mt-2">
            <LanguageSwitcher />
          </li>
        </ul>
      )}
    </div>
  );
}
