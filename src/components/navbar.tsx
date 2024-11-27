"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { Switch, FormControlLabel } from "@mui/material";
import "react-toggle/style.css";
import Link from "next/link";

const CustomNavbar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [userexpanded, setUserExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");
    setIsDarkMode(savedTheme === "dark");
    setIsArabic(savedLanguage === "ar");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.setAttribute(
      "lang",
      savedLanguage === "ar" ? "ar" : "en"
    );
  }, []);

  // تغيير الوضع الليلي وحفظه في localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
      if (newMode) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    });
  };

  //change language
  const toggleLanguage = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsArabic(checked);
    const languageCode = checked ? "ar" : "en";
    const direction = languageCode === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", languageCode);
    document.documentElement.setAttribute("lang", languageCode);
    document.documentElement.setAttribute("dir", direction);
  };
  // إغلاق القوائم عند النقر خارجها
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
        style={{ height: "50px" }}
        className={`flex items-center justify-between ${
          isDarkMode ? "bg-black text-white" : "bg-yellow-400 text-black"
        }`}
      >
        {/* السويتش والقائمة المنسدلة */}
        <div className="navbar-start mt-3">
          <div className="hidden md:flex items-center">
            <FormControlLabel
              control={
                <Switch
                  checked={isArabic}
                  onChange={toggleLanguage}
                  name="language-switch"
                  color="primary"
                  inputProps={{ "aria-label": "language toggle" }}
                />
              }
              label={isArabic ? "AR" : "EN"}
            />
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
                  isDarkMode
                    ? "bg-black text-white"
                    : "bg-yellow-400 text-black"
                } ${isArabic ? "right-0" : "left-0"}`}
              >
                {/* Dark Mode Switch */}
                <li className="flex items-center justify-between">
                  <span>{isArabic ? "الوضع" : "Dark"}</span>
                  <FormControlLabel
                    control={
                      <Switch
                        className="mx-2"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        name="language-switch"
                        color="primary"
                        inputProps={{ "aria-label": "language toggle" }}
                      />
                    }
                    label={isDarkMode ? <FaMoon /> : <FaSun />}
                  />
                </li>

                {/* Language Switch */}
                <li className="flex items-center justify-between mt-2">
                  <span>{isArabic ? "اللغة" : "Language"}</span>
                  <FormControlLabel
                    control={
                      <Switch
                        className="mx-2"
                        checked={isArabic}
                        onChange={toggleLanguage}
                        name="language-switch"
                        color="primary"
                        inputProps={{ "aria-label": "language toggle" }}
                      />
                    }
                    label={isArabic ? "AR" : "EN"}
                  />
                </li>
                <li className="mt-2">
                  <hr className="border-gray-700" />
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-black">
                  <Link href="/">{isArabic ? "الصفحة الرئيسية" : "Home"}</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-black">
                  <Link href="/services">
                    {isArabic ? "الخدمات" : "Services"}
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-black">
                  <Link href="/contact">
                    {isArabic ? "اتصل بنا" : "Contact Us"}
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-black">
                  <Link href="/car-store">
                    {isArabic ? "معرض السيارات" : "Car Store"}
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        {/* عنوان النافبار */}
        <div className="navbar-center mt-3">
          <a
            className={`btn btn-ghost text-xl ${
              isDarkMode ? " text-white" : " text-black"
            }`}
          >
            brand logo
          </a>
        </div>
        {/* الدارك مود */}
        <div className="navbar-end flex mt-3 item-center justify-center">
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
                className="btn btn-ghost btn-circle flex  border"
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
                  className={`absolute border text-light mt-3 w-48 shadow rounded z-10 text-right ${
                    isDarkMode
                      ? "bg-black text-white"
                      : "bg-yellow-400 text-black"
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
        className={`navbar hidden md:flex  ${
          isDarkMode ? "bg-black text-white" : "bg-yellow-400 text-black"
        }`}
      >
        <ul className="flex items-center justify-center">
          <li className="px-4 py-2 hover:bg-gray-200 hover:text-black">
            <Link href="/">{isArabic ? "الصفحة الرئيسية" : "Home"}</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 hover:text-black">
            <Link href="/services">{isArabic ? "الخدمات" : "Services"}</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 hover:text-black">
            <Link href="/contact">{isArabic ? "اتصل بنا" : "Contact Us"}</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 hover:text-black">
            <Link href="/car-store">
              {isArabic ? "معرض السيارات" : "Car Store"}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default CustomNavbar;
