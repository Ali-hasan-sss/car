"use client";

import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";

interface Category {
  id: number;
  title: string;
  cmodels: {
    id: number;
    title: string;
  }[];
}

interface Manufacturer {
  id: number;
  title: string;
  categories: Category[];
}

const DainamicSelector: React.FC<{
  value: number | null; // قيمة العنصر المختار حاليًا
  data?: Manufacturer[]; // بيانات مباشرة (اختيارية)
  Api_URL?: string; // عنوان API للحصول على البيانات (اختياري)
  onChange: (value: number | null) => void; // دالة لتحديث القيمة المختارة
  onCategoriesChange?: (categories: Category[]) => void; // دالة لتمرير الفئات المرتبطة (اختيارية)
}> = ({ value, data, Api_URL, onChange, onCategoriesChange }) => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);

  // تحديد مصدر البيانات: من API أو من المصفوفة
  useEffect(() => {
    if (data) {
      // إذا تم تمرير البيانات مباشرة، يتم استخدامها
      setManufacturers(data);
      setLoading(false);
    } else if (Api_URL) {
      // إذا تم تمرير رابط API، يتم جلب البيانات
      const fetchManufacturers = async () => {
        try {
          const response = await axiosInstance.get(Api_URL);
          setManufacturers(response.data.data); // تخزين البيانات في الحالة
        } catch (err) {
          console.error("Error fetching manufacturers:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchManufacturers();
    } else {
      // إذا لم يتم تمرير أي بيانات أو رابط API
      console.warn("لم يتم تمرير بيانات أو رابط API.");
      setLoading(false);
    }
  }, [data, Api_URL]);

  // العثور على العنصر المختار حاليًا
  const selectedManufacturer =
    manufacturers.find((manufacturer) => manufacturer.id === value) || null;

  // تحديث القيمة المختارة والفئات المرتبطة
  const handleSelectionChange = (newValue: Manufacturer | null) => {
    // تمرير ID العنصر المختار إلى المكون الأب
    onChange(newValue ? newValue.id : null);

    // تمرير الفئات المرتبطة بالعنصر المختار إذا كانت الدالة متوفرة
    if (onCategoriesChange) {
      onCategoriesChange(newValue ? newValue.categories : []);
    }
  };

  return (
    <div className="w-full">
      <Autocomplete
        options={manufacturers}
        getOptionLabel={(option) => option.title} // عرض العنوان في القائمة
        value={selectedManufacturer} // تحديد القيمة المختارة
        onChange={(event, newValue) => handleSelectionChange(newValue)} // عند تغيير الاختيار
        className="w-full"
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "white",
              borderRadius: "6px",
              "& .MuiOutlinedInput-root": {
                height: 35, // ضبط الارتفاع
                paddingY: "8px",
                paddingX: "12px",
                "& fieldset": {
                  borderColor: "#d1d5db", // لون الحدود (رمادي فاتح مثل السابق)
                },
                "&:hover fieldset": {
                  borderColor: "#a1a1aa", // لون الحدود عند التحويم
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1", // لون الحدود عند التركيز (لون أزرق فاتح)
                },
              },
            }}
          />
        )}
        loading={loading}
        noOptionsText="لا توجد صناعات متاحة" // رسالة عند عدم وجود خيارات
      />
    </div>
  );
};

export default DainamicSelector;
