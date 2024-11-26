"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import ReactSwitch from "react-switch";

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
  const toggleLanguage = (checked: boolean) => {
    setIsArabic(checked);
    const languageCode = checked ? "ar" : "en";
    localStorage.setItem("language", languageCode);
    document.documentElement.setAttribute("lang", languageCode);
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
    <nav
      className={`navbar ${
        isDarkMode ? "bg-black text-white" : "bg-yellow-400 text-black"
      }`}
    >
      {/* القائمة المنسدلة */}
      <div className="navbar-start">
        <div className="dropdown" ref={dropdownRef}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setExpanded(!expanded)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-light"
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
              className={`menu menu-sm absolute rounded-box z-[1] mt-3 rounded p-2 shadow w-52 left-0 top-full ${
                isDarkMode ? "bg-black text-white" : "bg-yellow-400 text-black"
              }`}
            >
              {/* Dark Mode Switch */}
              <li className="flex items-center justify-between">
                <span>{isArabic ? "الوضع" : "Dark"}</span>
                <ReactSwitch
                  onChange={toggleDarkMode}
                  checked={isDarkMode}
                  offColor="#888"
                  onColor="#4CAF50"
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 10,
                        color: "#FFD700",
                      }}
                    >
                      <FaSun />
                    </div>
                  }
                  checkedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 10,
                        color: "#FFD700",
                      }}
                    >
                      <FaMoon />
                    </div>
                  }
                  height={16}
                  width={34}
                />
              </li>

              {/* Language Switch */}
              <li className="flex items-center justify-between mt-2">
                <span>{isArabic ? "العربية" : "English"}</span>
                <ReactSwitch
                  onChange={toggleLanguage}
                  checked={isArabic}
                  offColor="#888"
                  onColor="#4CAF50"
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 10,
                        color: "#fff",
                        paddingRight: 2,
                      }}
                    >
                      EN
                    </div>
                  }
                  checkedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 10,
                        color: "#fff",
                        paddingLeft: 2,
                      }}
                    >
                      AR
                    </div>
                  }
                  height={16}
                  width={34}
                />
              </li>
              <li className="mt-2">
                <hr className="border-gray-700" />
              </li>
              <li className="block px-4 py-2 hover:bg-gray-200 hover:text-black">
                <a>{isArabic ? "الصفحة الرئيسية" : "Home"}</a>
              </li>
              <li className="block px-4 py-2 hover:bg-gray-200 hover:text-black">
                <a>{isArabic ? "الخدمات" : "Services"}</a>
              </li>
              <li className="block px-4 py-2 hover:bg-gray-200 hover:text-black">
                <a>{isArabic ? "اتصل بنا" : "Contact Us"}</a>
              </li>
              <li className="block px-4 py-2 hover:bg-gray-200 hover:text-black">
                <a>{isArabic ? "معرض السيارات" : "Car Store"}</a>
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* عنوان النافبار */}
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl text-light">brand logo</a>
      </div>
      {/* أيقونات */}
      <div className="navbar-end flex item-center justify-center">
        <div>
          <button
            className="btn mt-1 btn-ghost btn-circle"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-light"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v2m0 14v2m8-10h2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414-1.414M18.364 18.364l-1.414-1.414M6.05 6.05L4.636 7.464"
                />
              </svg>
            )}
          </button>
        </div>
        <div ref={userDropdownRef}>
          <button className="mt-1 mr-4 relative">
            <div
              tabIndex={0}
              role="button"
              onClick={() => setUserExpanded(!userexpanded)}
              className="btn btn-ghost btn-circle"
            >
              <FaUser className="text-light" />
            </div>
            {userexpanded && (
              <ul
                className={`absolute text-light right-0 mt-3 w-48 shadow rounded z-10 text-right ${
                  isDarkMode
                    ? "bg-black text-white"
                    : "bg-yellow-400 text-black"
                }`}
              >
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-gray-200 hover:text-black"
                    href="/login"
                  >
                    {!isArabic ? "Login" : "تسجيل الدخول"}
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-gray-200 hover:text-black"
                    href="/register"
                  >
                    {!isArabic ? "Create Account" : "إنشاء حساب"}
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-gray-200 text-red-500 hover:text-red-600"
                    href="/logout"
                    onClick={() =>
                      console.log(!isArabic ? "Logout" : "تسجيل الخروج")
                    }
                  >
                    {!isArabic ? "Logout" : "تسجيل الخروج"}
                  </a>
                </li>
              </ul>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
