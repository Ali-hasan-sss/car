import { useLanguage } from "@/app/context/LanguageContext";
import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

interface SelectorInputProps {
  options: { value: string; label: string }[];
  value: string;
  placeholder: string;
  error?: string;
  label?: string;
  onChange: (value: string) => void;
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <span style={{ color: "#9ca3af" /* Tailwind's gray-400 */ }}>
                {placeholder}
              </span>
            );
          }
          return (
            <span style={{ color: "#111827" /* Tailwind's gray-900 */ }}>
              {t(options.find((o) => o.value === selected)?.label || "")}
            </span>
          );
        }}
        sx={{
          backgroundColor: "white",
          height: 35,
          "& .MuiSelect-select": {
            paddingY: "8px",
            paddingX: "12px",
          },
        }}
      >
        {/* Render options */}
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {t(option.label)}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{t(error)}</FormHelperText>}
    </FormControl>
  );
};

export default TextSelector;
