import { useLanguage } from "../../context/LanguageContext";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  value: string;
  Forgot_password: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  error,
  Forgot_password,
  onChange,
}) => {
  const { t, isArabic } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="form_group flex flex-col py-2 items-start justify-start">
      <div className="flex items-center w-full justify-between">
        <label htmlFor="password" className="text-xs">
          {t("Password")}
          <span className="text-red-500">*</span>
        </label>
        {Forgot_password && (
          <a className="text-blue-500 underline text-sm" href="#">
            {t("Forgot_password")}
          </a>
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
    </div>
  );
};

export default PasswordInput;
