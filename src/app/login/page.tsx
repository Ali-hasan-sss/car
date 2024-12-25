"use client";

import React, { useEffect, useState } from "react";
import Register_nav from "@/components/header/register_navbar";
import Register_footer from "@/components/footer/Register_footer";
import "./login.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { useLanguage } from "../context/LanguageContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Login";
  }, []);
  const [formData, setFormData] = useState<LoginFormInputs>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormInputs>>({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { t } = useLanguage();
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormInputs> = {};

    // التحقق من البريد الإلكتروني
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // التحقق من كلمة المرور
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("/api/auth/login", formData);
        console.log("Login successful:", response.data);
        // هنا يمكن التعامل مع نجاح تسجيل الدخول
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(
          "Login failed:",
          axiosError.response?.data || axiosError.message
        );
        setErrors({
          email: "Invalid email or password.",
          password: "Invalid email or password.",
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Register_nav />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-secondary1 w-full">
        <div className="container w-full h-full flex items-center justify-center">
          <div className="form_content flex flex-col items-center justify-center gap-[24px] w-[350px] p-[20px] bg-white">
            {/* Form Header */}
            <div className="header flex flex-col gap-[20px] text-center">
              <h1 className="title">{t("Login")}</h1>
              <p className="des">{t("login_des")}</p>
            </div>

            {/* Form Inputs */}
            <form
              className="flex w-full flex-col gap-[24px]"
              onSubmit={handleSubmit}
            >
              {/* Email Input */}
              <div className="form_group flex flex-col gap-[8px] items-start justify-start">
                <label htmlFor="email">
                  {t("Email")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="soufang@mail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={` ${errors.email ? "input_err" : "input"}`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              {/* Password Input */}
              <div className="form_group flex flex-col gap-[8px] items-start justify-start">
                <div className="flex items-center w-full justify-between">
                  <label htmlFor="password">
                    {t("Password")}
                    <span className="text-red-500">*</span>
                  </label>
                  <a className="forget" href="#">
                    {t("Forgot_password")}
                  </a>
                </div>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder={t("Password") + "..."}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={` ${errors.password ? "input_err" : "input"}`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-[10px] text-gray-500"
                  >
                    {showPassword ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form_group flex flex-col gap-[8px] items-start justify-start">
                <button type="submit" className="w-full bg-primary1 submit">
                  {t("Login")}
                </button>
                <p className="dont_have">
                  {t("Dont_have_an_account")}
                  <a className="text-blue-500 mx-1" href="/signup">
                    {t("Signup")}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Register_footer />
    </div>
  );
};

export default Login;
