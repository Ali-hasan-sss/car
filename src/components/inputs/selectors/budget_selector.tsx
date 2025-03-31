import { useLanguage } from "../../../context/LanguageContext";
import { Select, MenuItem, FormControl } from "@mui/material";
import React, { useEffect } from "react";

interface BudgetSelectorProps {
  from_budget: string;
  to_budget: string;
  options: {
    fromOptions: { value: string; label: string }[];
    toOptions: { value: string; label: string }[];
  };
  placeholder: { from: string; to: string };
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  error?: string;
}

const Budget_selector: React.FC<BudgetSelectorProps> = ({
  from_budget,
  to_budget,
  options,
  placeholder,
  onFromChange,
  onToChange,
  error,
}) => {
  const { t } = useLanguage();

  // التأكد من أن to_budget أكبر من from_budget
  useEffect(() => {
    if (
      to_budget &&
      from_budget &&
      parseFloat(to_budget) < parseFloat(from_budget)
    ) {
      onToChange(""); // إعادة ضبط قيمة `to_budget` إذا كانت غير صحيحة
    }
  }, [from_budget, to_budget, onToChange]);

  return (
    <div className=" items-center w-full">
      {/* Selector From */}
      <div className="flex items-center w-full gap-4">
        <div className="flex flex-col w-full">
          <FormControl fullWidth error={!!error} size="small">
            <Select
              value={from_budget}
              onChange={(e) => onFromChange(e.target.value)}
              displayEmpty
              renderValue={(selected) =>
                selected === "" ? (
                  <span className="text-gray-400">{t(placeholder.from)}</span>
                ) : (
                  <span className="text-black">
                    {
                      options.fromOptions.find((opt) => opt.value === selected)
                        ?.label
                    }
                  </span>
                )
              }
              sx={{
                backgroundColor: "white",
                height: 35,
                fontSize: 14,
                paddingY: "0px",
                paddingX: "0px",
                "& .MuiSelect-select": {
                  paddingY: "8px",
                  paddingX: "12px",
                },
              }}
              fullWidth
            >
              <MenuItem value="" disabled>
                {t(placeholder.from)}
              </MenuItem>
              {options.fromOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Selector To */}
        <div className="flex flex-col w-full">
          <FormControl fullWidth error={!!error} size="small">
            <Select
              value={to_budget}
              onChange={(e) => onToChange(e.target.value)}
              displayEmpty
              renderValue={(selected) =>
                selected === "" ? (
                  <span className="text-gray-400">{t(placeholder.to)}</span>
                ) : (
                  <span className="text-black">
                    {
                      options.toOptions.find((opt) => opt.value === selected)
                        ?.label
                    }
                  </span>
                )
              }
              sx={{
                backgroundColor: "white",
                height: 35,
                fontSize: 14,
                paddingY: "0px",
                paddingX: "0px",
                "& .MuiSelect-select": {
                  paddingY: "8px",
                  paddingX: "12px",
                },
              }}
              fullWidth
            >
              <MenuItem value="" disabled>
                {t(placeholder.to)}
              </MenuItem>
              {options.toOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.value}
                  disabled={
                    from_budget !== "" &&
                    parseFloat(option.value) < parseFloat(from_budget)
                  } // تعطيل الخيارات غير الصالحة
                >
                  {t(option.label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {/* عرض الخطأ */}
      {error && <p className="text-red-500 text-sm mt-2">{t(error)}</p>}
    </div>
  );
};

export default Budget_selector;
