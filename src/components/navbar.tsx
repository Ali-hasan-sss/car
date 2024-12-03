"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import LanguageSwitch from "@/components/btn-switch/LanguageSwitch";
import ThemSwitch from "@/components/btn-switch/ThemSwich";
import "react-toggle/style.css";
import Link from "next/link";
import { AppContext } from "../app/context/AppContext";
import { usePathname } from "next/navigation";

const navItems = [
  { label_ar: "الرئيسية", label_en: "Home", href: "/" },
  { label_ar: "الخدمات", label_en: "Services", href: "/services" },
  { label_ar: "اتصل بنا", label_en: "Contact us", href: "/contact" },
  { label_ar: "معرض السيارات", label_en: "Car Store", href: "/car-store" },
];
const CustomNavbar: React.FC = () => {
  const { isDarkMode, isArabic, toggleDarkMode } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  const [userexpanded, setUserExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        style={{ height: "60px" }}
        className={`flex items-center justify-between ${
          isDarkMode ? "dark-bg text-white" : "light-bg text-black"
        }`}
      >
        {/* السويتش والقائمة المنسدلة */}
        <div className="navbar-start my-1">
          <div className="hidden md:flex items-center">
            <LanguageSwitch />
          </div>

          {/* القائمة المنسدلة - تظهر فقط في الشاشات الصغيرة */}
          <div
            className={`dropdown md:hidden ${
              isDarkMode ? "text-light" : "text-black"
            }`}
            ref={dropdownRef}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={() => setExpanded(!expanded)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  isDarkMode ? "text-light" : "text-black"
                }`}
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
                  isDarkMode ? "dark-bg text-white" : "light-bg text-black"
                } ${isArabic ? "right-0" : "left-0"}`}
              >
                {/* Dark Mode Switch */}
                <li className="flex items-center justify-between">
                  <span>{isArabic ? "الوضع" : "Dark"}</span>
                  <ThemSwitch />
                </li>

                {/* Language Switch */}
                <li className="flex items-center justify-between ">
                  <span>{isArabic ? "اللغة" : "Lang"}</span>
                  <LanguageSwitch />
                </li>
                {navItems.map((item) => (
                  <li
                    key={item.href}
                    className={`mt-2 pb-1 px-2 nav-item ${
                      pathname === item.href ? "active" : ""
                    }`}
                  >
                    <Link href={item.href}>
                      {isArabic ? item.label_ar : item.label_en}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* center navbar for logo */}
        <div className="navbar-center my-1">
          <a
            className={`btn btn-ghost text-xl ${
              isDarkMode ? " text-white" : " text-black"
            }`}
          >
            logo
          </a>
        </div>
        {/* الدارك مود */}
        <div className="navbar-end flex my-1 item-center justify-center">
          <div className="hidden md:block">
            <button
              className="btn mt-1 btn-ghost btn-circle"
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <FaMoon className="text-light" /> : <FaSun />}
            </button>
          </div>

          <div ref={userDropdownRef}>
            <button className="mt-1  relative">
              <div
                tabIndex={0}
                role="button"
                onClick={() => setUserExpanded(!userexpanded)}
                className={`btn-nav flex ${
                  isDarkMode ? " border-dark" : " border-light"
                }`}
              >
                <span
                  className={` mx-2 ${
                    isDarkMode ? "text-white" : " text-black"
                  }`}
                >
                  {!isArabic ? "Login" : "التسجيل"}
                </span>
                <FaUser
                  className={`  text-xl ${
                    isDarkMode ? "text-light" : "text-black"
                  }`}
                />
              </div>
              {userexpanded && (
                <ul
                  className={`absolute border  mt-4 w-48 shadow rounded z-10 text-right ${
                    isDarkMode ? "dark-bg text-white" : "light-bg text-black"
                  } ${isArabic ? "left-0" : "right-0"}`}
                >
                  <li>
                    <Link href="/login">
                      <div className="block px-4 py-2 hover:bg-gray-200 hover:text-black flex items-center">
                        <FaSignInAlt className="m-2" />
                        {!isArabic ? "Login" : "تسجيل الدخول"}
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/register">
                      <div className="block px-4 py-2 hover:bg-gray-200 hover:text-black flex items-center">
                        <FaUserPlus className="m-2" />
                        {!isArabic ? "Create Account" : "إنشاء حساب"}
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/logout">
                      <div
                        className="block px-4 py-2 hover:bg-gray-200 text-red-500 hover:text-red-600 flex items-center"
                        onClick={() =>
                          console.log(!isArabic ? "Logout" : "تسجيل الخروج")
                        }
                      >
                        <FaSignOutAlt className="m-2" />
                        {!isArabic ? "Logout" : "تسجيل الخروج"}
                      </div>
                    </Link>
                  </li>
                </ul>
              )}
            </button>
          </div>
        </div>
      </nav>
      <nav
        className={` hidden md:flex  ${
          isDarkMode
            ? "dark-bg  shadow-[0px_20px_7px_rgb(255, 255, 255)]"
            : "light-bg  shadow-[0px_20px_7px_rgba(0,0,0,0.1)]"
        }`}
      >
        <ul className="flex items-center justify-center">
          {navItems.map((item) => (
            <li
              key={item.href}
              className={`mx-3 pb-2 px-2 nav-item ${
                pathname === item.href ? "active" : ""
              }`}
            >
              <Link href={item.href}>
                {isArabic ? item.label_ar : item.label_en}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default CustomNavbar;
