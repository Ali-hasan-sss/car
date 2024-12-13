"use client";

import { AppContext } from "@/app/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function Bottombar() {
  const pathname = usePathname();
  const isArabic = useContext(AppContext);
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
    <div className="menu d-none d-md-block w-full h-[47px]  ">
      <ul className="flex item-center gap-[12px] px-[2px] ">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              className={`nav-item text-lg p-[10px] gap-[10px] ${
                pathname === item.path ? "active" : ""
              }`}
              href={item.path}
            >
              {isArabic ? item.title_en : item.title_ar}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
