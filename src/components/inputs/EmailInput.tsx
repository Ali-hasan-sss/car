import { useLanguage } from "@/app/context/LanguageContext";
import React from "react";

interface EmailInputProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, error, onChange }) => {
  const { t } = useLanguage();
  return (
    <div className="form_group flex flex-col gap-[8px] items-start justify-start">
      <label htmlFor="email">
        {t("Email")}
        <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="soufang@mail.com"
        value={value}
        onChange={onChange}
        className={error ? "input_err" : "input"}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default EmailInput;
