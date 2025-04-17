// components/Checkbox.tsx
"use client";

import { useState } from "react";

interface CheckboxProps {
  label: string;
  checkedValue: string | number; // القيمة عند التشييك
  uncheckedValue: string | number; // القيمة عند عدم التشييك
  initialValue?: boolean;
  onChange?: (value: string | number) => void;
}

export default function Checkbox({
  label,
  checkedValue,
  uncheckedValue,
  initialValue = false,
  onChange,
}: CheckboxProps) {
  const [checked, setChecked] = useState<boolean>(initialValue);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (onChange) {
      onChange(newChecked ? checkedValue : uncheckedValue);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
      />
      <label className="text-lg text-text_des font-medium">{label}</label>
    </div>
  );
}
