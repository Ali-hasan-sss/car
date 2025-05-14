// components/DateRangePicker.tsx
import TextSelector from "@/components/inputs/selectors/text_selector";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
}) => {
  const { t } = useLanguage();
  const options = [
    { value: "week", label: "last_week" },
    { value: "month", label: "last_month" },
    { value: "6month", label: "last_6month" },
    { value: "year", label: "last_year" },
  ];

  return (
    <div className="mb-4">
      <TextSelector
        placeholder={t("Choise")}
        options={options}
        value={value}
        onChange={(val) => onChange(String(val))}
      />
    </div>
  );
};

export default DateRangePicker;
