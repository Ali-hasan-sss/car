import { useLanguage } from "@/app/context/LanguageContext";
import EmailInput from "@/components/inputs/EmailInput";
import React from "react";

interface Personal_step1 {
  formData: {
    name: string;
    email: string;
  };
  errors: {
    name?: string;
    email?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Personal_step1: React.FC<Personal_step1> = ({
  formData,
  errors,
  onInputChange,
}) => {
  const { t } = useLanguage();
  return (
    <div className="w-full ">
      <div className="form_group w-full flex flex-col gap-[4px] items-start justify-start">
        <label htmlFor="name">
          {t("Full_Name")}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder={t("name") + "..."}
          value={formData.name}
          onChange={onInputChange}
          className={`w-full ${errors.name ? "input_err" : "input"}`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>
      <EmailInput
        value={formData.email}
        error={errors.email}
        onChange={onInputChange}
      />
    </div>
  );
};

export default Personal_step1;
