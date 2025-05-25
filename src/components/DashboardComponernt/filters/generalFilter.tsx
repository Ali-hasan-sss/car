import Text_selector from "@/components/inputs/selectors/text_selector";
import { useState } from "react";
interface filterProps {
  label?: string;
  onFilterChange?: (value: string) => void;
}

export default function GeneralFilter({ label, onFilterChange }: filterProps) {
  const [filtervalue, setFiltervalue] = useState("");

  const changeFilter = (value: string) => {
    setFiltervalue(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const filterOption = [
    { label: "All", value: "" },
    { label: "rejected", value: "0" },
    { label: "pending", value: "1" },
    { label: "in_progress", value: "2" },
    { label: "completed", value: "3" },
  ];

  return (
    <div className="p-2 bg-white w-full flex items-center gap-4 flex-nowrap">
      <label className="text-sm text-text_des flex-shrink-0">{label}</label>
      <Text_selector
        options={filterOption}
        onChange={(val) => changeFilter(String(val))}
        value={filtervalue}
        placeholder="All"
      />
    </div>
  );
}
