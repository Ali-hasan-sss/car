import Text_selector from "@/components/inputs/selectors/text_selector";
import { useState } from "react";
interface filterProps {
  label?: string;
}
export default function GeneralFilter({ label }: filterProps) {
  const [filtervalue, setFiltervalue] = useState("");
  const changeFilter = (value: string) => {
    setFiltervalue(value);
  };
  const filterOption = [
    { label: "All", value: "" },
    { label: "cars", value: "models" },
    { label: "cars Color", value: "Colors" },
  ];
  return (
    <div className="p-2 bg-white w-full flex items-center gap-4 flex-nowrap">
      <label className="text-sm  text-text_des flex-shrink-0">{label}</label>
      <Text_selector
        options={filterOption}
        onChange={(val) => changeFilter(String(val))}
        value={filtervalue}
        placeholder="All"
      />
    </div>
  );
}
