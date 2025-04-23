// components/DateRangePicker.tsx
import TextSelector from "@/components/inputs/selectors/text_selector";
import React from "react";

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
}) => {
  const options = [
    { value: "week", label: "اخر اسبوع" },
    { value: "month", label: "اخر شهر" },
    { value: "6month", label: "اخر 6 اشهر" },
    { value: "year", label: "اخر سنة " },
  ];

  return (
    <div className="mb-4">
      <TextSelector
        placeholder="تحديد الفترة الزمنية:"
        options={options}
        value={value}
        onChange={(val) => onChange(String(val))}
      />
    </div>
  );
};

export default DateRangePicker;
