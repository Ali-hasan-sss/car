import { useLanguage } from "../../../context/LanguageContext";
import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

interface SelectorInputProps {
  options: { value: string | number; label: string }[];
  value: string | number | null;
  placeholder: string;
  error?: string;
  label?: string;
  onChange: (value: string | number) => void;
}

const TextSelector: React.FC<SelectorInputProps> = ({
  options,
  placeholder,
  value,
  onChange,
  label,
  error,
}) => {
  const { t } = useLanguage();

  return (
    <FormControl fullWidth error={!!error} size="small">
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        placeholder={placeholder}
        value={value || ""}
        onChange={(event) => {
          const selectedValue = event.target.value;
          const option = options.find(
            (o) => o.value.toString() === selectedValue
          );
          const newValue = option ? option.value : selectedValue;
          if (newValue !== null && newValue !== undefined) {
            onChange(newValue as string | number);
          }
        }}
        displayEmpty
        renderValue={(selected) => {
          if (selected === "" || selected === undefined) {
            return (
              <span style={{ color: "#9ca3af" /* Tailwind's gray-400 */ }}>
                {placeholder}
              </span>
            );
          }
          return (
            <span style={{ color: "#111827" /* Tailwind's gray-900 */ }}>
              {t(
                options?.find((o) => o.value === selected)?.label || placeholder
              )}
            </span>
          );
        }}
        sx={{
          height: 35,
          "& .MuiSelect-select": {
            paddingY: "8px",
            paddingX: "12px",
          },
        }}
      >
        {/* Render options */}
        {options?.map((option, index) => (
          <MenuItem key={index} value={option.value.toString()}>
            {t(option.label)}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{t(error)}</FormHelperText>}
    </FormControl>
  );
};

export default TextSelector;
