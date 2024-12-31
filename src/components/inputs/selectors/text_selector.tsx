import { useLanguage } from "@/app/context/LanguageContext";
import React from "react";

interface SelectorInputProps {
  options: { value: string; label: string }[]; // مصفوفة الخيارات
  value: string;
  placeholder: string;
  error?: string; // رسالة الخطأ إذا وجدت
  onChange: (value: string) => void; // دالة تمرير القيمة إلى المكون الأب
}

const Text_selector: React.FC<SelectorInputProps> = ({
  options,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const { t } = useLanguage();

  // معالجة تغيير الخيار
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value); // إرسال القيمة المختارة إلى المكون الأب
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex border rounded bg-white w-full h-[35px] py-[8px] px-[12px]">
        <select
          id="address"
          value={value} // القيمة الحالية
          onChange={handleChange} // معالجة التغيير
          className={`w-full text-lg focus:outline-none ${
            value === "" ? "text-gray-400" : "text-black"
          }`}
        >
          {/* خيار placeholder */}
          <option
            className="text-gray-400"
            value=""
            disabled
            hidden // إخفاء الخيار من القائمة
          >
            {placeholder}
          </option>
          {/* عرض الخيارات */}
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="text-black" // لون النص العادي
            >
              {t(option.label)} {/* ترجمة النص إذا لزم */}
            </option>
          ))}
        </select>
      </div>
      {/* عرض الخطأ إذا وجد */}
      {error && <p className="text-red-500 text-sm mt-1">{t(error)}</p>}
    </div>
  );
};

export default Text_selector;
