// components/Checkbox.tsx
"use client";

import { useState } from "react";

interface CheckboxProps {
  label: string; // نص التسمية
  initialValue?: boolean; // القيمة الأولية (اختياري)
  onChange?: (value: boolean) => void; // دالة لمعالجة التغيير
}

export default function Checkbox({
  label,
  initialValue = false,
  onChange,
}: CheckboxProps) {
  const [checked, setChecked] = useState<boolean>(initialValue);

  // تعديل الحالة عند تغيير الـ checkbox
  const handleCheckboxChange = () => {
    const newValue = !checked;
    setChecked(newValue);

    // إرسال القيمة الجديدة إلى الوالد إذا كانت الدالة موجودة
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* عرض الـ checkbox */}
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
