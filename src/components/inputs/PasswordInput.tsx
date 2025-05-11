import { useLanguage } from "../../context/LanguageContext";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AnimatedModal from "../modal/AnimatedModal";
import EmailInput from "./EmailInput";
import LoadingBTN from "../loading/loadingBTN";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

interface PasswordInputProps {
  value: string;
  Forgot_password: boolean;
  error?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface forgetinput {
  email: string;
}
const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  error,
  label,
  Forgot_password,
  onChange,
}) => {
  const { t, isArabic } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [openForget, setopenForget] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgetData, setForgetData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<Partial<forgetinput>>({});
  const validateForm = (): boolean => {
    const newErrors: Partial<forgetinput> = {};
    if (!forgetData.email) {
      newErrors.email = t("Email_required");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(forgetData.email)) {
      newErrors.email = t("Error_valid_email");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await axiosInstance.post("/customer/forgetPassword", forgetData);
        toast.success(t("email_send_for_reset_password"));
      } catch (err) {
        toast.error(t("error_forget_password"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="form_group flex flex-col py-2 items-start justify-start">
      <div className="flex items-center w-full justify-between">
        <label htmlFor="password" className="text-xs">
          {label ? label : t("Password")}
          <span className="text-red-500">*</span>
        </label>
        {Forgot_password && (
          <button
            type="button"
            className="text-blue-500 cursor-pointer underline text-sm"
            onClick={() => setopenForget(true)}
          >
            {t("Forgot_password")}
          </button>
        )}
      </div>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder={t("Password") + "..."}
          value={value}
          onChange={onChange}
          className={error ? "input_err" : "input"}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`absolute top-4 flex items-center text-gray-500 ${
            isArabic ? "left-3" : "right-3"
          }`}
        >
          {showPassword ? (
            <AiOutlineEye size={20} />
          ) : (
            <AiOutlineEyeInvisible size={20} />
          )}
        </button>
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
      {openForget && (
        <AnimatedModal
          className="w-[300px]"
          open={openForget}
          handleClose={() => setopenForget(false)}
        >
          <form className="flex flex-col w-full bg-secondary1 rounded-xl shadow p-4">
            <EmailInput
              value={forgetData.email}
              onChange={(e) => {
                setForgetData({ ...forgetData, email: e.target.value });
              }}
              error={errors.email}
            />
            <button
              onClick={handleSubmit}
              className="w-full mt-4 flex items-center justify-center bg-primary1 submit"
            >
              {loading ? <LoadingBTN /> : t("send")}
            </button>
          </form>
        </AnimatedModal>
      )}
    </div>
  );
};

export default PasswordInput;
