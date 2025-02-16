"use client";
import React, { useState } from "react";
import Register_nav from "@/components/header/register_navbar";
import Register_footer from "@/components/footer/Register_footer";
import "./login.css";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/");
  };

  const [formData, setFormData] = useState<LoginFormInputs>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormInputs>>({});
  const { t } = useLanguage();

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormInputs> = {};
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح.";
    }
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة.";
    } else if (formData.password.length < 8) {
      newErrors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        /*
        // محاولة تسجيل الدخول عبر API
        const response = await axiosInstance.post(`/login`, {
          formData,
        });
        const token = response.data.data.access_token;
        dispatch(setAuthToken(token));

        // console.log("Login successful:");
        // */

        router.push("/customer/dashboard");
      } catch (error) {
        console.error(error);
        setErrors({
          email: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
          password: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
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
      <Register_nav handleBack={handleBack} />
      <div className="flex-grow flex items-center justify-center bg-secondary1 w-full">
        <div className="container w-full h-full flex items-center justify-center">
          <div className="form_content flex flex-col items-center justify-center gap-[24px] w-[350px] p-[20px] bg-white">
            <div className="header flex flex-col gap-[20px] text-center">
              <h1 className="title">{t("Login")}</h1>
              <p className="des">{t("login_des")}</p>
            </div>
            <form
              className="flex w-full flex-col gap-[24px]"
              onSubmit={handleSubmit}
            >
              <EmailInput
                value={formData.email}
                error={errors.email}
                onChange={handleInputChange}
              />
              <PasswordInput
                value={formData.password}
                error={errors.password}
                onChange={handleInputChange}
              />
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
      <Register_footer />
    </div>
  );
};

export default Login;
