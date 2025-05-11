"use client";
import PasswordInput from "@/components/inputs/PasswordInput";
import { useState, useEffect } from "react";
import "../login/login.css";
import LoadingBTN from "@/components/loading/loadingBTN";
import { useLanguage } from "@/context/LanguageContext";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface resetFormInputs {
  password: string;
  password_confirmation: string;
}

export default function ResetPasswword() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<resetFormInputs>>({});
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
  });

  //  Extract token and email from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") || "";
    const email = params.get("email") || "";
    setFormData((prev) => ({ ...prev, token, email }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<resetFormInputs> = {};
    if (!formData.password) {
      newErrors.password = t("Password_required");
    } else if (formData.password.length < 8) {
      newErrors.password = t("Password_len");
    }
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = t("Password_required");
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = t("Password_dont-confirm");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await axiosInstance.post("/customer/password/reset", formData);
        toast.success(t("reset_success"));
        router.push("/login");
      } catch (error) {
        toast.error("err_reset");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex w-full h-[100vh] items-center justify-center bg-secondary1">
      <form
        className="flex bg-white shadow rounded-xl w-[350px] md:w-[400px] flex-col gap-4 py-7 px-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl text-gray-800">Reset password</h2>
        <PasswordInput
          Forgot_password={false}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
        />
        <PasswordInput
          label={t("confirm_password")}
          Forgot_password={false}
          value={formData.password_confirmation}
          onChange={(e) =>
            setFormData({
              ...formData,
              password_confirmation: e.target.value,
            })
          }
          error={errors.password_confirmation}
        />
        <button
          type="submit"
          className="w-full mt-4 flex items-center justify-center bg-primary1 submit"
        >
          {loading ? <LoadingBTN /> : t("resetPassword")}
        </button>
      </form>
    </div>
  );
}
