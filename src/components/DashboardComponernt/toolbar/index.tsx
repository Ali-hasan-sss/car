import { useLanguage } from "@/app/context/LanguageContext";
import { Grid2X2, List, Settings } from "lucide-react";
import { useState } from "react";

export default function ToolBar() {
  const [showing, setShowing] = useState("5");
  const [sortby, setSortby] = useState("date");
  const [view, setView] = useState("table");
  const { t } = useLanguage();

  const showingOptions = [5, 10, 25, 50];
  const sortByOptions = [t("date"), t("status"), t("model")];

  return (
    <div className="flex flex-col md:flex-row items-center w-full justify-end py-2 gap-4">
      <div className="flex items-center justify-between  md:justify-end  gap-4">
        <div className="flex gap-2">
          <label className="text-lg">
            {t("Showing")} 1-{showing} {t("of")} 1{/*count */}
          </label>
        </div>
        <div className="w-[2px] h-[20px] bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <label className="text-lg">{t("Showing")}:</label>
          <select
            className="bg-secondary1 outline-none text-lg text-text_title"
            value={showing}
            onChange={(e) => setShowing(e.target.value)}
          >
            {showingOptions.map((option, index) => (
              <option key={index} className="text-gray-600">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between   md:justify-end  gap-4">
        <div className="w-[2px] h-[20px] bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <label className="text-lg">{t("Sort_by")}:</label>
          <select
            className="bg-secondary1 outline-none text-lg text-text_title"
            value={sortby}
            onChange={(e) => setSortby(e.target.value)}
          >
            {sortByOptions.map((option, index) => (
              <option key={index} className="text-gray-600">
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[2px] h-[20px] bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <label className="text-lg">{t("View_as")} : </label>
          <div className="flex items-center p-1 gap-1">
            <button
              onClick={() => setView("table")}
              className={`cursor-pointer rounded hover:bg-primary1 hover:text-white ${
                view === "table" ? "bg-primary1 text-white" : ""
              }`}
            >
              <List />
            </button>
            <button
              onClick={() => setView("menu")}
              className={`cursor-pointer rounded hover:bg-primary1 hover:text-white ${
                view === "menu" ? "bg-primary1 text-white" : ""
              }`}
            >
              <Grid2X2 />
            </button>
          </div>
        </div>
        <div className="w-[2px] h-[20px] bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <button className="cursor-pointer rounded hover:bg-primary1 hover:text-white">
              <Settings />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
