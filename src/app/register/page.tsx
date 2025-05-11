"use client";

import React, { useEffect, useState } from "react";
import Register_nav from "@/components/NavBar/register_navbar";
import Register_footer from "@/components/footer/Register_footer";
import "../login/login.css";
import { useLanguage } from "../../context/LanguageContext";
import Step1 from "./step1";
import Personal_step1 from "./personal_steps/step1";
import Company_step1 from "./company_steps/step1";
import Personal_step2 from "./personal_steps/step2";
import Company_step2 from "./company_steps/step2";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { setLogin } from "@/store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoadingBTN from "@/components/loading/loadingBTN";
import { AxiosError } from "axios";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignupFormInputs>({
    name: "",
    company: "",
    email: "",
    password: "",
    type: "",
  });
  const [errors, setErrors] = useState<Partial<SignupFormInputs>>({});
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const is_full_data = useSelector(
    (state: RootState) => state.auth.user?.is_full_data
  );

  useEffect(() => {
    if (isLoggedIn && is_full_data) {
      router.push("/customer/dashboard");
    }
  }, [isLoggedIn, router]);
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Signup";
  }, []);
  const handleBack = () => {
    if (step === 1) {
      router.push("/");
    } else {
      setStep(step - 1);
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<SignupFormInputs> = {};
    if (!formData.type) {
      newErrors.type = t("Error_Account_type");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<SignupFormInputs> = {};
    if (accountType === "1") {
      if (!formData.name) {
        newErrors.name = t("Error_Name");
      }
      if (!formData.email) {
        newErrors.email = t("Email_required");
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        newErrors.email = t("Error_valid_email");
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } else {
      if (!formData.name) {
        newErrors.name = t("Error_Name");
      }
      if (!formData.company) {
        newErrors.company = t("Error_Company_Name");
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
  };
  const validateStep3 = (): boolean => {
    const newErrors: Partial<SignupFormInputs> = {};
    if (accountType === "1") {
      if (!formData.password) {
        newErrors.password = t("Password_required");
      } else if (formData.password.length < 8) {
        newErrors.password = t("Password_len");
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } else {
      if (!formData.password) {
        newErrors.password = t("Password_required");
      } else if (formData.password.length < 8) {
        newErrors.password = t("Password_len");
      }
      if (!formData.email) {
        newErrors.email = t("Email_required");
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        newErrors.email = t("Error_valid_email");
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

    setErrors({});

    if (validateStep3()) {
      setLoading(true);
      try {
        const registerResponse = await axiosInstance.post(
          "customer/register",
          formData
        );
        const { id, name, email, type, token } = registerResponse.data.data;

        const userDataTransformed = {
          id,
          email,
          first_name: name.split(" ")[0] || "",
          last_name: name.split(" ")[1] || "",
          is_active: 1,
          userRole: type === 1 ? "USER" : "COMPANY",
          type: type,
        };
        toast.success("register_success");
        dispatch(setLogin({ token, user: userDataTransformed }));
        router.push("register/success");
      } catch (error) {
        setLoading(false);

        const axiosError = error as AxiosError<{
          message: string;
          errors?: { email?: string[] };
        }>;

        if (axiosError.response?.status === 422) {
          const emailExists = axiosError.response.data.errors?.email?.[0];

          if (emailExists) {
            const customMessage = t("Error_Email_taken");
            if (accountType === "1") {
              setStep(2);
            } else {
              setStep(3);
            }
            // عرض الرسالة تحت حقل الإيميل
            setErrors((prev) => ({
              ...prev,
              email: customMessage,
            }));
          } else {
            toast.error(t("register_Eroor"));
          }
        } else {
          console.error("Signup failed:", axiosError);
          toast.error(t("register_Eroor"));
        }
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
                <Step1
                  cklick={handleTypeSelect}
                  error={errors.type}
                  selectedType={formData.type}
                />
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
                    className="w-full flex items-center justify-center bg-primary1 submit"
                  >
                    {loading ? <LoadingBTN /> : t("Signup")}
                  </button>
                )}
              </div>

              {/* Terms */}
              <div className="terms-box w-full text-sm px-[20px] flex flex-col gap-[15px] items-center justify-center">
                <div className=" w-full flex mt-3 items-center justify-start">
                  <p className="text-gray-500 px-[5px]">
                    {t("Already_have_an_account")}
                  </p>
                  <a href="/login" className="text-blue-700 underline ">
                    {t("Login")}
                  </a>
                </div>
                <div className=" w-full items-center justify-start">
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
