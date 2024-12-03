"use client";

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useForm, SubmitHandler } from "react-hook-form";
import "@/components/forms/form_style.css";
interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { isDarkMode, isArabic } = useContext(AppContext); // استخدام القيم من السياق

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onFormSubmit: SubmitHandler<LoginData> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className={`p-4 login ${isDarkMode ? "dark-bg-2 " : "light-bg-2 "}`}>
      <h1 className="text-center mb-4 text-xl">
        {isArabic ? "تسجيل الدخول" : "Login"}
      </h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={` p-5 rounded-lg shadow-lg max-w-md mx-auto ${
          isDarkMode ? "dark-bg " : "light-bg "
        }`}
      >
        {/* حقل البريد الإلكتروني */}
        <div className="form-group">
          <label htmlFor="email" className="block mb-1">
            {isArabic ? "البريد الإلكتروني" : "Email"}
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: isArabic
                ? "البريد الإلكتروني مطلوب"
                : "Email is required",
            })}
            className={`input mt-1 p-2 rounded-md w-full  ${
              isDarkMode ? "dark-bg-2" : "light-bg-2"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* حقل كلمة المرور */}
        <div className="form-group mt-4">
          <label htmlFor="password" className="block mb-1">
            {isArabic ? "كلمة المرور" : "Password"}
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: isArabic
                ? "كلمة المرور مطلوبة"
                : "Password is required",
              minLength: {
                value: 8,
                message: isArabic
                  ? "يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل"
                  : "Password must be at least 8 characters long",
              },
            })}
            className={`input mt-1 p-2 rounded-md w-full  ${
              isDarkMode ? "dark-bg-2" : "light-bg-2"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* زر تسجيل الدخول */}
        <button
          type="submit"
          className={`mt-6 text-white w-full rounded p-2  ${
            isDarkMode ? "send-btn-dark" : "send-btn-light"
          } `}
        >
          {isArabic ? "تسجيل الدخول" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
