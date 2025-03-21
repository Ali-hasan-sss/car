import { useLanguage } from "@/app/context/LanguageContext";
import React from "react";

interface BudgetSelectorProps {
  from_budget: string; // القيمة الحالية لـ from
  to_budget: string; // القيمة الحالية لـ to
  options: {
    fromOptions: { value: string; label: string }[];
    toOptions: { value: string; label: string }[];
  };
  placeholder: { from: string; to: string };
  onFromChange: (value: string) => void; // دالة تغيير from_budget
  onToChange: (value: string) => void; // دالة تغيير to_budget
  error?: string;
}

const Budget_selector: React.FC<BudgetSelectorProps> = ({
  from_budget,
  to_budget,
  options,
  placeholder,
  onFromChange,
  onToChange,
  error,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center w-full gap-4">
      {/* Selector From */}
      <div className="flex flex-col">
        <div className="flex border rounded bg-white w-full h-[35px] py-[8px] px-[12px]">
          <select
            value={from_budget}
            onChange={(e) => onFromChange(e.target.value)}
            className={`w-full bg-white text-lg focus:outline-none ${
              from_budget === "" ? "text-gray-400" : "text-black"
            }`}
          >
            <option value="" disabled>
              {placeholder.from}
            </option>
            {options.fromOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selector To */}
      <div className="flex flex-col">
        <div className="flex border rounded bg-white w-full h-[35px] py-[8px] px-[12px]">
          <select
            value={to_budget}
            onChange={(e) => onToChange(e.target.value)}
            className={`w-full text-lg focus:outline-none ${
              to_budget === "" ? "text-gray-400" : "text-black"
            }`}
          >
            <option value="" disabled>
              {placeholder.to}
            </option>
            {options.toOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* عرض رسالة الخطأ إذا وجدت */}
      {error && <p className="text-red-500 text-sm mt-2">{t(error)}</p>}
    </div>
  );
};

export default Budget_selector;
