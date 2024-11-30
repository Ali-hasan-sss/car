"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";
import Image from "next/image";
import "./form_style.css";
import { AppContext } from "@/app/context/AppContext";

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: "personal" | "company";
  file: File | null;
  commercialRegistration?: string;
  taxNumber?: string;
}

const SignUpForm = () => {
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [accountType, setAccountType] = useState<"personal" | "company">(
    "personal"
  );
  const { isDarkMode, isArabic } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-4xl mx-auto  p-8 rounded-lg shadow-lg grid grid-cols-1 gap-1 sm:grid-cols-2 ${
        isDarkMode ? "dark-bg " : "light-bg "
      }`}
    >
      {/* الاسم الكامل */}
      <div className="form-group">
        <label htmlFor="fullName" className="text-lg font-medium label ">
          {!isArabic ? "full Name" : "الاسم الكامل"}
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName", { required: "الاسم الكامل مطلوب" })}
          className="input text-black mt-1 p-2  rounded-md w-full"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email" className="text-lg font-medium label ">
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
          className="input text-black mt-1 p-2 rounded-md w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password" className="text-lg font-medium label">
          {isArabic ? "كلمة المرور" : "Password"}
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: isArabic ? "كلمة المرور مطلوبة" : "Password is required",
            minLength: {
              value: 8,
              message: isArabic
                ? "يجب أن تكون كلمة المرور أكثر من 8 أحرف"
                : "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
              message: isArabic
                ? "يجب أن تحتوي كلمة المرور على أحرف كبيرة، أرقام ورموز"
                : "Password must contain uppercase letters, numbers, and symbols",
            },
          })}
          className="input text-black mt-1 p-2 rounded-md w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrengthBar password={password} className="mt-2" />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword" className="text-lg font-medium label">
          {isArabic ? "تأكيد كلمة المرور" : "Confirm Password"}
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: isArabic
              ? "يجب تأكيد كلمة المرور"
              : "Confirm Password is required",
            validate: (value) =>
              value === password ||
              (isArabic ? "كلمة المرور غير متطابقة" : "Passwords do not match"),
          })}
          className="input text-black mt-1 p-2 rounded-md w-full"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Account Type */}
      <div className="form-group">
        <label htmlFor="accountType" className="text-lg font-medium label">
          {isArabic ? "نوع الحساب" : "Account Type"}
        </label>
        <select
          id="accountType"
          {...register("accountType")}
          onChange={(e) =>
            setAccountType(e.target.value as "personal" | "company")
          }
          className="input mt-1 p-2 text-black rounded-md w-full"
        >
          <option value="personal">
            {isArabic ? "حساب شخصي" : "Personal Account"}
          </option>
          <option value="company">
            {isArabic ? "حساب شركة" : "Company Account"}
          </option>
        </select>
      </div>

      {/* Company Fields */}
      {accountType === "company" && (
        <>
          <div className="form-group">
            <label
              htmlFor="commercialRegistration"
              className="text-lg font-medium label"
            >
              {isArabic
                ? "رقم السجل التجاري"
                : "Commercial Registration Number"}
            </label>
            <input
              id="commercialRegistration"
              type="text"
              {...register("commercialRegistration", {
                required: isArabic
                  ? "رقم السجل التجاري مطلوب"
                  : "Commercial Registration is required",
              })}
              className="input mt-1 p-2 text-black rounded-md w-full "
            />
            {errors.commercialRegistration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.commercialRegistration.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="taxNumber" className="text-lg font-medium label">
              {isArabic ? "الرقم الضريبي" : "Tax Number"}
            </label>
            <input
              id="taxNumber"
              type="text"
              {...register("taxNumber", {
                required: isArabic
                  ? "الرقم الضريبي مطلوب"
                  : "Tax Number is required",
              })}
              className="input text-black mt-1 p-2 rounded-md w-full"
            />
            {errors.taxNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.taxNumber.message}
              </p>
            )}
          </div>
        </>
      )}

      {/* رفع صورة الهوية */}
      <div className="form-group">
        <label htmlFor="file" className="text-lg font-medium label">
          {isArabic ? "رفع صورة الهوية" : "Upload ID Image"}
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          {...register("file", { required: "يجب رفع صورة الهوية" })}
          onChange={handleFileChange}
          className="input text-black mt-1 p-2 rounded-md w-full"
        />
        {file && (
          <div className="mt-2">
            <h3 className="text-lg font-medium text-gray-700">معاينة الصورة</h3>
            <Image
              src={URL.createObjectURL(file)}
              alt="ID"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
        )}
        {errors.file && (
          <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
        )}
      </div>
      {/* Phone Number */}
      <div className="form-group">
        <label htmlFor="phoneNumber" className="text-lg font-medium label">
          {isArabic ? "رقم الهاتف" : "Phone Number"}
        </label>
        <input
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber", {
            required: isArabic
              ? "رقم الهاتف مطلوب"
              : "Phone Number is required",
          })}
          className="input text-black mt-1 p-2 rounded-md w-full"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
        <button
          type="submit"
          className="btn-submit mt-4 bg-blue-500 hover:bg-gray-600 text-white p-2 px-5  w-full sm:w-auto"
        >
          إنشاء حساب
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
