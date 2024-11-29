"use client";
import React, { useContext } from "react";
import SignUpForm from "@/components/forms/SignUpForm";
import { AppContext } from "../context/AppContext";
const RegisterPage = () => {
  const { isDarkMode, isArabic } = useContext(AppContext);

  return (
    <div className={`${isDarkMode ? "dark-bg-2 " : "light-bg-2 "}`}>
      <h1 className="text-center p-2 text-xl">
        {!isArabic ? "Create Account" : "إنشاء حساب"}
      </h1>
      <SignUpForm />
    </div>
  );
};

export default RegisterPage;
