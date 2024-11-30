"use client";
import React, { useContext } from "react";
import SignUpForm from "@/components/forms/SignUpForm";
import { AppContext } from "../context/AppContext";
const RegisterPage = () => {
  const { isDarkMode, isArabic } = useContext(AppContext);

  return (
    <div
      className={` rejisterPage ${isDarkMode ? "dark-bg-2 " : "light-bg-2 "}`}
    >
      <h1 className="text-center p-4 text-xl">
        {!isArabic ? "Create Account" : "إنشاء حساب"}
      </h1>
      <SignUpForm />
    </div>
  );
};

export default RegisterPage;
