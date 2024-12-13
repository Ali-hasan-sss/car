"use client";
import { AppContext } from "@/app/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function Dropdown() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isArabic } = useContext(AppContext);
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
  const navItems = [
    { id: 1, title_en: "Home", title_ar: "الرئيسية", path: "/" },
    { id: 2, title_en: "Services", title_ar: "الخدمات", path: "/services" },
    { id: 3, title_en: "About us", title_ar: "من نحن", path: "/about" },
    {
      id: 4,
      title_en: "Information",
      title_ar: "معلومات",
      path: "/Information",
    },
    {
      id: 5,
      title_en: " Contact Us",
      title_ar: "تواصل معنا",
      path: "/contact",
    },
  ];
  return (
    <div className={`dropdown md:hidden `} ref={dropdownRef}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle"
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-10 w-10 mt-4 `}
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
          className={`menu border menu-sm absolute rounded-box z-[1] mt-4 rounded p-4 shadow w-52 top-full ${
            isArabic ? "left-0 " : "right-0"
          }`}
        >
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`mt-2 pb-1 px-2 nav-item ${
                pathname === item.path ? "active" : ""
              }`}
            >
              <Link href={item.path}>
                {isArabic ? item.title_ar : item.title_en}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
