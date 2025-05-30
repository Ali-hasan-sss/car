"use client";
import React, { useState, useEffect } from "react"; // إضافة useEffect
import Register_nav from "@/components/NavBar/register_navbar";
import Register_footer from "@/components/footer/Register_footer";
import "./login.css";
import { useLanguage } from "../../context/LanguageContext";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken, setUser } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";
import LoadingBTN from "@/components/loading/loadingBTN";
import { toast } from "sonner";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.replace("/customer/dashboard"); // إعادة توجيه المستخدم إلى لوحة التحكم
    }
  }, [isLoggedIn]);

  const handleBack = () => {
    window.location.replace("/");
  };

  const [formData, setFormData] = useState<LoginFormInputs>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormInputs>>({});
  const { t } = useLanguage();
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | login";
  }, []);
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormInputs> = {};
    if (!formData.email) {
      newErrors.email = t("Email_required");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = t("Error_valid_email");
    }
    if (!formData.password) {
      newErrors.password = t("Password_required");
    } else if (formData.password.length < 8) {
      newErrors.password = t("Password_len");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // محاولة تسجيل الدخول عبر API
        const response = await axiosInstance.post(`customer/login`, formData);
        const {
          id,
          name,
          type,
          email,
          token,
          is_full_data,
          contact,
          idDetail,
          email_verified_at,
        } = response.data.data;
        const [first_name, last_name] = name.split(" ");

        const userData = {
          id,
          email,
          first_name: first_name || "",
          last_name: last_name || "",
          userRole: type === 1 ? "USER" : "USER",
          type,
          is_full_data: is_full_data === 1,
          IsVerified: email_verified_at,
          contact: contact || null,
          idDetail: idDetail || null,
        };

        dispatch(setAuthToken(token));

        dispatch(setUser(userData));
        toast.success(t("Logged_successfully"));
        // إعادة توجيه المستخدم إلى لوحة التحكم
        window.location.replace("/customer/dashboard");
      } catch (error) {
        console.error(error);
        toast.error(t("Error"));
        setErrors({
          email: t("Error_Email_pass"),
          password: t("Error_Email_pass"),
        });
      } finally {
        setLoading(false);
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

  if (isLoggedIn) {
    return null;
  }

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
            <form className="flex w-full flex-col " onSubmit={handleSubmit}>
              <EmailInput
                value={formData.email}
                error={errors.email}
                onChange={handleInputChange}
              />
              <PasswordInput
                Forgot_password
                value={formData.password}
                error={errors.password}
                onChange={handleInputChange}
              />
              <div className="form_group flex flex-col gap-[8px] items-start justify-start">
                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center bg-primary1 submit"
                >
                  {loading ? <LoadingBTN /> : t("Login")}
                </button>
                <p className="text-sm ">
                  {t("Dont_have_an_account")}
                  <a className="text-blue-500 underline mx-1" href="/register">
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
