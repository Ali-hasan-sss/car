"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import LanguageSwitcher from "@/components/btn-switch/LanguageSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Bottombar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const navItems = [
    { id: 1, label: t("Home"), path: "/" },
    { id: 2, label: t("Services"), path: "/services" },
    { id: 3, label: t("About_us"), path: "/about" },
    {
      id: 4,
      label: t("Information"),
      path: "/Information",
    },
    {
      id: 5,
      label: t("Contact_Us"),
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
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </div>
  );
}
