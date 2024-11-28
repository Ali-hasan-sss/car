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
import { Switch, FormControlLabel } from "@mui/material";
import "react-toggle/style.css";
import Link from "next/link";
import { AppContext } from "../app/context/AppContext";

const CustomNavbar: React.FC = () => {
  const { isDarkMode, isArabic, toggleDarkMode, toggleLanguage } =
    useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  const [userexpanded, setUserExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

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
        style={{ height: "60px" }}
        className={`flex items-center justify-between ${
          isDarkMode ? "dark-bg text-white" : "light-bg text-black"
        }`}
      >
        {/* السويتش والقائمة المنسدلة */}
        <div className="navbar-start my-1">
          <div className="hidden md:flex items-center">
            <FormControlLabel
              control={
                <Switch
                  className={`${isArabic ? "ml-0" : "ml-2"}`}
                  checked={isArabic}
                  onChange={toggleLanguage}
                  name="language-switch"
                  color="primary"
                  inputProps={{ "aria-label": "language toggle" }}
                  sx={{
                    "& .MuiSwitch-switchBase": {
                      color: "gray", // اللون عند الإيقاف
                    },
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "blue", // اللون عند التشغيل
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "gray", // لون المسار عند الإيقاف
                    },
                    "& .MuiSwitch-track.Mui-checked": {
                      backgroundColor: "blue", // لون المسار عند التشغيل
                    },
                  }}
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
                  isDarkMode ? "dark-bg text-white" : "light-bg text-black"
                } ${isArabic ? "right-0" : "left-0"}`}
              >
                {/* Dark Mode Switch */}
                <li className="flex items-center justify-between">
                  <span>{isArabic ? "الوضع" : "Dark"}</span>
                  <FormControlLabel
                    label={isDarkMode ? <FaMoon /> : <FaSun />}
                    control={
                      <Switch
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        name="language-switch"
                        color="primary"
                        inputProps={{ "aria-label": "language toggle" }}
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            color: "gray", // اللون عند الإيقاف
                          },
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "blue", // اللون عند التشغيل
                          },
                          "& .MuiSwitch-track": {
                            backgroundColor: "gray", // لون المسار عند الإيقاف
                          },
                          "& .MuiSwitch-track.Mui-checked": {
                            backgroundColor: "blue", // لون المسار عند التشغيل
                          },
                        }}
                      />
                    }
                  />
                </li>

                {/* Language Switch */}
                <li className="flex items-center justify-between mt-2">
                  <span>{isArabic ? "اللغة" : "Lang"}</span>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isArabic}
                        onChange={toggleLanguage}
                        name="language-switch"
                        color="warning"
                        inputProps={{ "aria-label": "language toggle" }}
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            color: "gray", // اللون عند الإيقاف
                          },
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "blue", // اللون عند التشغيل
                          },
                          "& .MuiSwitch-track": {
                            backgroundColor: "gray", // لون المسار عند الإيقاف
                          },
                          "& .MuiSwitch-track.Mui-checked": {
                            backgroundColor: "blue", // لون المسار عند التشغيل
                          },
                        }}
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
                className="btn btn-ghost btn-circle flex  "
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
          isDarkMode ? "dark-bg text-white" : "light-bg text-black"
        }`}
      >
        <ul className="flex items-center justify-center">
          <li className="mx-4 px-2 nav-item ">
            <Link href="/">{isArabic ? "الصفحة الرئيسية" : "Home"}</Link>
          </li>
          <li className="mx-4 px-2 nav-item ">
            <Link href="/services">{isArabic ? "الخدمات" : "Services"}</Link>
          </li>
          <li className="mx-4 px-2 nav-item ">
            <Link href="/contact">{isArabic ? "اتصل بنا" : "Contact Us"}</Link>
          </li>
          <li className="mx-4 px-2 nav-item ">
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
