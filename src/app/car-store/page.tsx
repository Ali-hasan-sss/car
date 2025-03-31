"use client";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
const RegisterPage = () => {
  const { isDarkMode, isArabic } = useContext(AppContext);

  return (
    <div
      className={` rejisterPage ${isDarkMode ? "dark-bg-2 " : "light-bg-2 "}`}
    >
      <h1 className="text-center p-4 text-xl">
        {!isArabic ? "Car Store" : "معرض السيارات"}
      </h1>
    </div>
  );
};

export default RegisterPage;
