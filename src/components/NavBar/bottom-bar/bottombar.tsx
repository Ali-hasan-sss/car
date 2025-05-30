"use client";

import { useLanguage } from "../../../context/LanguageContext";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Bottombar() {
  const { t } = useLanguage();

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  const navItems = [
    { id: 1, label: t("Home"), path: "/" },
    { id: 2, label: t("About_us"), path: "/about" },
    { id: 3, label: t("Services"), path: "/services" },

    {
      id: 4,
      label: t("Blogs"),
      path: "/blog",
    },
    {
      id: 5,
      label: t("Cars_Store"),
      path: "/car-store",
    },
    {
      id: 6,
      label: t("Contact_Us"),
      path: "/contact",
    },
  ];
  return (
    <div className="menu px-[10px] md:px-[50px] hidden md:block w-full h-[47px]  ">
      <ul className="flex item-center gap-[12px]">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              className={`nav-item text-xs p-[10px] gap-2 ${
                currentPath === item.path ? "active" : ""
              }`}
              href={item.path}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className=" text-lg gap-[10px]">
          <LanguageSwitcher />
        </li>
      </ul>
    </div>
  );
}
