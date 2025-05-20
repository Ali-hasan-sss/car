"use client";

import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import axiosInstance from "@/utils/axiosInstance";
import { useLanguage } from "@/context/LanguageContext";

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
  returnTitle?: boolean;
  value: number | string | null;
  data?: Manufacturer[];
  Api_URL?: string;
  onChange: (value: number | null) => void;
  onCategoriesChange?: (categories: Category[]) => void;
  placeholder?: string;
  error?: string;
  dataLoading?: boolean;
}> = ({
  returnTitle,
  value,
  data,
  Api_URL,
  onChange,
  onCategoriesChange,
  placeholder,
  error,
  dataLoading,
}) => {
  const { t } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setManufacturers(data);
      setLoading(false);
    } else if (Api_URL) {
      const fetchManufacturers = async () => {
        try {
          const response = await axiosInstance.get(Api_URL);
          setManufacturers(response.data.data);
        } catch (err) {
          console.error("Error fetching manufacturers:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchManufacturers();
    } else {
      console.warn("لم يتم تمرير بيانات أو رابط API.");
      setLoading(false);
    }
  }, [data, Api_URL]);

  const selectedManufacturer =
    manufacturers.find((manufacturer) =>
      returnTitle ? manufacturer.title === value : manufacturer.id === value
    ) || null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectionChange = (newValue: any) => {
    onChange(newValue ? (returnTitle ? newValue.title : newValue.id) : null);
    if (onCategoriesChange) {
      onCategoriesChange(newValue ? newValue.categories : []);
    }
  };

  return (
    <div className="w-full">
      <Autocomplete
        options={manufacturers}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.title}
          </li>
        )}
        value={selectedManufacturer}
        onChange={(event, newValue) => handleSelectionChange(newValue)}
        className="w-full"
        loading={data ? dataLoading : loading}
        loadingText={t("loading")}
        noOptionsText={t("no_options")}
        renderInput={(params) => (
          <div style={{ position: "relative", width: "100%" }}>
            <TextField
              {...params}
              placeholder={placeholder || "اختر العنصر"}
              fullWidth
              margin="none"
              error={!!error}
              helperText={error}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading || dataLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: "6px",
                "& .MuiOutlinedInput-root": {
                  height: 35,
                  paddingY: "8px",
                  paddingX: "12px",
                  borderColor: error ? "#dc2626" : "#d1d5db", // ✅ تغيير لون البوردر عند الخطأ
                  "& fieldset": {
                    borderColor: error ? "#dc2626" : "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: error ? "#b91c1c" : "#a1a1aa",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: error ? "#991b1b" : "#6366f1",
                  },
                },
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default DainamicSelector;
