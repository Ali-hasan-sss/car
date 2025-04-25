import { useLanguage } from "../../context/LanguageContext";
import React from "react";

interface EmailInputProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, error, onChange }) => {
  const { t } = useLanguage();
  return (
    <div className="form_group flex py-2 flex-col items-start justify-start">
      <label htmlFor="email" className="text-sm">
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
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default EmailInput;
