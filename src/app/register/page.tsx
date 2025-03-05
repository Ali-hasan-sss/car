"use client";

import React, { useState } from "react";
import Register_nav from "@/components/header/register_navbar";
import Register_footer from "@/components/footer/Register_footer";
import "../login/login.css";
import axios, { AxiosError } from "axios";
import { useLanguage } from "../context/LanguageContext";
import Step1 from "./step1";
import Personal_step1 from "./personal_steps/step1";
import Company_step1 from "./company_steps/step1";
import Personal_step2 from "./personal_steps/step2";
import Company_step2 from "./company_steps/step2";
import { useRouter } from "next/navigation";

interface SignupFormInputs {
  name: string;
  company: string;
  email: string;
  password: string;
  type: string;
}

const Signup: React.FC = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignupFormInputs>({
    name: "",
    company: "",
    email: "",
    password: "",
    type: "",
  });
  const [errors, setErrors] = useState<Partial<SignupFormInputs>>({});

  const Router = useRouter();

  const handleBack = () => {
    if (step === 1) {
      Router.push("/");
    } else {
      setStep(step - 1);
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<SignupFormInputs> = {};
    if (!formData.type) {
      newErrors.type = "Account type is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<SignupFormInputs> = {};
    if (accountType === "1") {
      if (!formData.name) {
        newErrors.name = "Name is required.";
      }
      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } else {
      if (!formData.name) {
        newErrors.name = "Name is required.";
      }
      if (!formData.company) {
        newErrors.company = "Company name is required.";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
  };
  const validateStep3 = (): boolean => {
    const newErrors: Partial<SignupFormInputs> = {};
    if (accountType === "1") {
      if (!formData.password) {
        newErrors.password = "Password is required.";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } else {
      if (!formData.password) {
        newErrors.password = "Password is required.";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      }
      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }

    if (isValid) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep3()) {
      try {
        console.log(formData);
        const response = await axios.post("/api/auth/signup", formData);
        console.log("Signup successful:", response.data);
        // تنفيذ ما تريده بعد التسجيل
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(
          "Signup failed:",
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

  const handleTypeSelect = (type: string) => {
    setAccountType(type);
    setFormData((prev) => ({
      ...prev,
      type: type,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Register_nav handleBack={handleBack} />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-secondary1 w-full">
        <div className="container w-full h-full flex items-center justify-center">
          <div className="form_content flex flex-col items-center justify-center gap-[18px] w-[350px] py-[10px] px-[30px] bg-white">
            {/* Form Header */}
            <div className="header w-full flex flex-col gap-[10px] text-center">
              <h1 className="title">{t("Signup")}</h1>
              {step === 1 ? (
                <p className="des">{t("Signup_step1")} </p>
              ) : step === 2 && accountType === "1" ? (
                <p className="des">{t("Signup_step2_private")} </p>
              ) : step === 2 && accountType === "2" ? (
                <p className="des">{t("Signup_step2_company")} </p>
              ) : step === 3 && accountType === "1" ? (
                <p className="des">{t("Signup_step3_private")} </p>
              ) : (
                <p className="des">{t("Signup_step3_company")} </p>
              )}
            </div>
            {/* Form Inputs */}
            <form className="flex flex-col w-full items-center justify-center gap-[10px]">
              {step === 1 ? (
                <Step1 cklick={handleTypeSelect} error={errors.type} />
              ) : step === 2 && accountType === "1" ? (
                <Personal_step1
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              ) : step === 2 && accountType === "2" ? (
                <Company_step1
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              ) : step === 3 && accountType === "1" ? (
                <Personal_step2
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              ) : step === 3 && accountType === "2" ? (
                <Company_step2
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              ) : null}

              {/* Action Buttons */}
              <div className="action flex items-center justify-center w-full">
                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="w-full h-[40px] buttom"
                  >
                    {t("Next")}
                  </button>
                ) : (
                  <button
                    onClick={handleFinalSubmit}
                    className="w-full h-[40px] buttom"
                  >
                    {t("Signup")}
                  </button>
                )}
              </div>

              {/* Terms */}
              <div className="terms-box w-full px-[20px] flex flex-col gap-[15px] items-center justify-center">
                <div className="text w-full flex mt-3 items-center justify-start">
                  <p className="text-gray-500 px-[5px]">
                    {t("Already_have_an_account")}
                  </p>
                  <a href="/login" className="text-blue-500 ">
                    {t("Login")}
                  </a>
                </div>
                <div className="text w-full items-center justify-start">
                  <a href="#" className="text-gray-900">
                    {t("Terms") + " " + "&" + " " + t("Conditions") + " " + ":"}
                  </a>
                  <span className="text-gray-500 ">
                    {t("Privacy_Policy_des")}
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
