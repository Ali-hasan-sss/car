import Text_selector from "@/components/inputs/selectors/text_selector";
import GeneralFilter from "./generalFilter";
import { useState } from "react";
import Btn_borded from "@/components/buttons/btn/bordered_btn";
const filterOption = [
  { label: "All", value: "all" },
  { label: "cars Moldels", value: "models" },
  { label: "cars Color", value: "Colors" },
];
export default function QuickFilter() {
  const [filtervalue, setFiltervalue] = useState("");
  const changeFilter = () => {
    setFiltervalue("");
  };
  return (
    <div className="bg-white px-1 py-2 w-full flex flex-col items-center gap-2">
      <div className="flex items-start w-full gap-2">
        <div className="flex flex-col w-1/3">
          <GeneralFilter label="Quick Filter" />
        </div>
        <div className="w-2/3 flex items-start flex-nowrap gap-1">
          <div className="bg-gray-300 h-[150px] w-[1px] mx-2"></div>
          <h3 className="text-text_des text-lg mt-4 ">Filters</h3>

          <div className="flex items-center justify-between w-full">
            <div className="w-1/2 h-full mt-3 px-2 flex flex-col h-4 gap-4">
              <Text_selector
                options={filterOption}
                onChange={changeFilter}
                value={filtervalue}
                placeholder="Delivery to branch"
              />
              <Text_selector
                options={filterOption}
                onChange={changeFilter}
                value={filtervalue}
                placeholder="Delivery to branch"
              />
              <Text_selector
                options={filterOption}
                onChange={changeFilter}
                value={filtervalue}
                placeholder="Delivery to branch"
              />
            </div>
            <div className="w-1/2 h-full mt-3 px-2 flex flex-col h-4 gap-4">
              <Text_selector
                options={filterOption}
                onChange={changeFilter}
                value={filtervalue}
                placeholder="Delivery to branch"
              />
              <Text_selector
                options={filterOption}
                onChange={changeFilter}
                value={filtervalue}
                placeholder="Delivery to branch"
              />
              <Btn_borded label="Add filter" iconAdd className="text-sm" />
            </div>
          </div>
          <h3 className="text-text_des text-lg w-1/3 mt-4 ">
            Save as quick filter
          </h3>
        </div>
      </div>
      <div className="bg-gray-300 w-full h-[1px]" />

      <div className="flex-col w-full px-[20px]">
        <div className="flex items-center justify-between w-full ">
          <h3 className="text-text_des text-lg ">Active filter</h3>
          <Btn_borded label="Clear all" className="text-lg" iconClear />
        </div>
        <div className="filtersActive"></div>
      </div>
    </div>
  );
}
