"use client";

import React, { useEffect, useState } from "react";
import Register_nav from "@/components/header/register_navbar";
import Register_footer from "@/components/footer/Register_footer";
import "../login/login.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import { useLanguage } from "../context/LanguageContext";

interface SignupFormInputs {
  name: string;
  company?: string;
  email: string;
  password: string;
  type: string;
}

const Signup: React.FC = () => {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | sign up";
  }, []);
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<string | null>(null);
  console.log(accountType);
  const [formData, setFormData] = useState<SignupFormInputs>({
    name: "",
    company: "",
    email: "",
    password: "",
    type: "1",
  });
  const [errors, setErrors] = useState<Partial<SignupFormInputs>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTypeSelect = (type: string) => {
    setAccountType(type);
    setStep(2); // الانتقال للخطوة الثانية
  };
  /*const handleBack = () => {
    setStep(1); // العودة للخطوة الأولى
  };*/
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  /* const chooseType = () => {
    document.documentElement.classList.add("active");
  };*/
  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormInputs> = {};

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
          {/**content */}
          <div className="form_content flex flex-col items-center justify-center gap-[24px] w-[350px] py-[20px] px-[30px] bg-white">
            {/* Form Header */}
            <div className="header w-full flex flex-col gap-[20px] text-center">
              <h1 className="title">{t("Signup")}</h1>
              {step === 1 ? (
                <p className="des">{t("Signup_step1")} </p>
              ) : step === 2 ? (
                <p className="des">{t("Signup_step2_private")} </p>
              ) : (
                <p className="des">{t("Signup_step1")} </p>
              )}
            </div>
            {/* Form inputs */}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full  items-center justify-center gap-[10px]"
            >
              {step === 1 ? (
                <div className="w-full">
                  <div className="input_group w-full  flex items-center justify-between gap-[20px]">
                    <div
                      onClick={() => handleTypeSelect("1")}
                      className="input-box active w-[100px] h-[60px] flex items-center justify-center p-[8px]  "
                    >
                      Private
                    </div>
                    <div
                      onClick={() => handleTypeSelect("2")}
                      className="input-box w-[100px] h-[60px] flex items-center justify-center p-[8px] "
                    >
                      Company
                    </div>
                  </div>

                  <div className="label w-full  flex items-center justify-between gap-[20px]">
                    <label className=" w-[100px] text-sm text-gray-400 text-center">
                      (For individuals)
                    </label>
                    <label className=" w-[100px] text-sm text-gray-400 text-center">
                      (For businesses and organizations)
                    </label>
                  </div>
                </div>
              ) : step === 2 ? (
                <div className="w-full">
                  <div className="form_group w-full flex flex-col gap-[8px] items-start justify-start">
                    <label htmlFor="name">
                      Full name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="name..."
                      value={formData.name}
                      onChange={handleInputChange}
                      className={` w-full ${
                        errors.email ? "input_err" : "input"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="form_group w-full flex flex-col gap-[8px] items-start justify-start">
                    <label htmlFor="email">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="soufang@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={` w-full ${
                        errors.email ? "input_err" : "input"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  {/* Password Input */}
                  <div className="form_group w-full flex flex-col gap-[8px] items-start justify-start">
                    <div className="flex items-center w-full justify-between">
                      <label htmlFor="password">
                        Password<span className="text-red-500">*</span>
                      </label>
                      <a className="forget" href="#">
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="password..."
                        value={formData.password}
                        onChange={handleInputChange}
                        className={` ${
                          errors.password ? "input_err" : "input"
                        }`}
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
                </div>
              )}
              <div className="action flex items-center justify-center w-full">
                <button
                  disabled={step === 1}
                  type="submit"
                  className={`w-full h-[40px] ${
                    step === 1 || step === 2 ? "disabled" : "buttom "
                  }`}
                >
                  Sign up
                </button>
              </div>
              <div className="terms-box w-full px-[20px] flex flex-col gap-[15px] items-center justify-center">
                <div className="text w-full flex mt-3 items-center justify-start">
                  <p className="text-gray-500 px-[5px]">
                    Already have an account?
                  </p>
                  <a href="/login" className="text-blue-500 ">
                    Log in
                  </a>
                </div>
                <div className="text w-full  items-center justify-start">
                  <a href="#" className="text-gray-900">
                    Terms & Conditions:
                  </a>
                  <span className="text-gray-500 ">
                    “By signing up, you agree to our Terms & Conditions and
                    Privacy Policy.”
                  </span>
                </div>
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

export default Signup;
