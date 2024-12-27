import { useLanguage } from "@/app/context/LanguageContext";
import React from "react";

interface Company_step1 {
  formData: {
    name: string;
    company: string;
  };
  errors: {
    name?: string;
    company?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Company_step1: React.FC<Company_step1> = ({
  formData,
  errors,
  onInputChange,
}) => {
  const { t } = useLanguage();
  return (
    <div className="w-full">
      <div className="form_group w-full flex flex-col gap-[8px] items-start justify-start">
        <label htmlFor="name">
          {t("Full_name")}
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
      <div className="form_group w-full flex flex-col gap-[8px] items-start justify-start">
        <label htmlFor="company">
          {t("Company_name")}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          placeholder={t("Company_name") + "..."}
          value={formData.company}
          onChange={onInputChange}
          className={`w-full ${errors.company ? "input_err" : "input"}`}
        />
        {errors.company && (
          <span className="text-red-500 text-sm">{errors.company}</span>
        )}
      </div>
    </div>
  );
};

export default Company_step1;
