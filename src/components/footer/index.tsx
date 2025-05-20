"use client";

import Link from "next/link";
import "./style.css";
import { usePathname } from "next/navigation";
import Sucial_icon from "../sucial_Midia/sucial_icon";
import { useLanguage } from "@/context/LanguageContext";
export default function Footer() {
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
  const navItemsCol2 = [
    {
      id: 1,
      title_en: "Blogs",
      title_ar: "المقالات",
      path: "/Blogs",
    },
    {
      id: 2,
      title_en: "Car Store",
      title_ar: "معرض السيارات",
      path: "/Car-Store",
    },
    { id: 3, title_en: "FAQ", title_ar: "الأسئلة الشائعة", path: "/faq" },
  ];
  const pathname = usePathname();
  const { isArabic, t } = useLanguage();
  return (
    <div className="footer flex flex-col gap-5 py-4 px-[10px] md:px-[85px]">
      <div className="block md:flex justify-between">
        <div className="w-full flex flex-col gap-[30px] md:w-2/3 ">
          <div className="logo p-1">
            <h2
              className="text-white "
              style={{ fontSize: "24px", fontWeight: "700" }}
            >
              SOUFAN GLOBAL{" "}
            </h2>
          </div>
          <p style={{ color: "#FFD700", fontWeight: "500", fontSize: "18px" }}>
            {isArabic ? "" : "Your Trusted Partner in Car Imports and Shipping"}
          </p>
          <div className="content flex flex-col gap-[20px]">
            <Sucial_icon />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex   gap-[15px]">
          <div className="flex flex-col mt-3">
            <p className="footer_nav mx-4">{t("Quick_Links")}</p>
            <div className="flex">
              <ul>
                {navItems.map((item) => (
                  <li key={item.id} className="py-2">
                    <Link
                      className={`footer_nav text-lg p-[10px] gap-[10px] ${
                        pathname === item.path ? "active" : ""
                      }`}
                      href={item.path}
                    >
                      {isArabic ? item.title_ar : item.title_en}{" "}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul>
                {navItemsCol2.map((item) => (
                  <li key={item.id} className="py-2">
                    <Link
                      className={`footer_nav text-lg p-2 gap-1 ${
                        pathname === item.path ? "active" : ""
                      }`}
                      href={item.path}
                    >
                      {isArabic ? item.title_ar : item.title_en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="credits flex flex-col gap-1 ">
        <img src="/images/Divider.png" alt="" />
        <div className="block md:flex items-center justify-between">
          <p
            className="text-white "
            style={{ fontSize: "14px", fontWeight: "400" }}
          >
            © 2024 Bariq. All rights reserved.
          </p>
          <div className=" text-white flex items-center gap-[16px]">
            <a href="" className="footer_link">
              Privacy Policy
            </a>
            <a href="" className="footer_link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
