import { useLanguage } from "@/app/context/LanguageContext";
import React from "react";

interface Budget_selectorProps {
  options: {
    fromOptions: { value: string; label: string }[];
    toOptions: { value: string; label: string }[];
  }; // مصفوفة الخيارات
  value: { from: string; to: string }; // القيم الحالية (من، إلى)
  placeholder: { from: string; to: string }; // النصوص الافتراضية
  onChange: (budget: { from: string; to: string }) => void; // دالة تمرير القيمة النهائية
  error?: string; // رسالة الخطأ إذا وجدت
}

const Budget_selector: React.FC<Budget_selectorProps> = ({
  options,
  value,
  placeholder,
  onChange,
  error,
}) => {
  const { t } = useLanguage();

  // معالجة تغيير قيمة "from"
  const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, from: e.target.value }); // تحديث قيمة "from"
  };

  // معالجة تغيير قيمة "to"
  const handleToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, to: e.target.value }); // تحديث قيمة "to"
  };

  return (
    <div className="flex items-center w-full gap-4">
      {/* Selector From */}
      <div className="flex flex-col">
        <div className="flex border rounded bg-white w-full h-[35px] py-[8px] px-[12px]">
          <select
            value={value.from} // القيمة الحالية لـ "from"
            onChange={handleFromChange} // معالجة التغيير
            className={`w-full text-lg focus:outline-none ${
              value.from === "" ? "text-gray-400" : "text-black"
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
            value={value.to} // القيمة الحالية لـ "to"
            onChange={handleToChange} // معالجة التغيير
            className={`w-full text-lg focus:outline-none ${
              value.to === "" ? "text-gray-400" : "text-black"
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
