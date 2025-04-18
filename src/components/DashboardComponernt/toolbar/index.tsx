import { useLanguage } from "../../../context/LanguageContext";
import { Grid2X2, List, Settings } from "lucide-react";
import { useEffect } from "react";

interface ToolBarProps {
  view?: string;
  setView?: (view: string) => void;
  totalItems?: number;
  showing?: number;
  sortby?: string;
  onShowingChange?: (value: number) => void;
  onSortByChange?: (value: string) => void;
}

export default function ToolBar({
  view,
  setView,
  totalItems,
  showing,
  sortby,
  onShowingChange,
  onSortByChange,
}: ToolBarProps) {
  const { t } = useLanguage();

  const showingOptions = [5, 10, 25, 50];
  const sortByOptions = [
    { value: "date", label: t("date") },
    { value: "status", label: t("status") },
    { value: "model", label: t("model") },
  ];
  const handleViewChange = (newView: string) => {
    if (setView) {
      setView(newView); // تأكد من أنه يتم استدعاء setView بشكل صحيح
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("viewMode", newView); // تخزين الوضع في localStorage
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedView = localStorage.getItem("viewMode");
      if (savedView && setView) {
        setView(savedView);
      }
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center w-full justify-end py-2 gap-4">
      <div className="flex items-center justify-between md:justify-end gap-4">
        <div className="flex gap-2">
          <label className="text-lg">
            {t("Showing")} 1-{showing} {t("of")} {totalItems}
          </label>
        </div>
        <div className="w-[2px] h-[20px] bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <label className="text-sm">{t("Showing")}:</label>
          <select
            className="bg-secondary1 outline-none text-sm text-text_title"
            value={showing}
            onChange={(e) =>
              onShowingChange && onShowingChange(Number(e.target.value))
            }
          >
            {showingOptions.map((option) => (
              <option key={option} value={option} className="text-gray-600">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4">
        <div className="w-[2px] h-[20px] bg-gray-300"></div>
        {sortby && (
          <div className="flex items-center gap-1">
            <label className="text-sm">{t("Sort_by")}:</label>
            <select
              className="bg-secondary1 outline-none text-sm text-text_title"
              value={sortby}
              onChange={(e) => onSortByChange && onSortByChange(e.target.value)}
            >
              {sortByOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-gray-600"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {view && <div className="w-[2px] h-[20px] bg-gray-300"></div>}
        {view && (
          <div className="flex items-center gap-1">
            <label className="text-sm">{t("View_as")} :</label>
            <div className="flex items-center p-1 gap-1">
              <button
                onClick={() => handleViewChange("table")}
                className={`cursor-pointer rounded hover:bg-primary1 hover:text-white ${
                  view === "table" ? "bg-primary1 text-white" : ""
                }`}
              >
                <List />
              </button>
              <button
                onClick={() => handleViewChange("menu")}
                className={`cursor-pointer rounded hover:bg-primary1 hover:text-white ${
                  view === "menu" ? "bg-primary1 text-white" : ""
                }`}
              >
                <Grid2X2 />
              </button>
            </div>
          </div>
        )}
        {view && <div className="w-[2px] h-[20px] bg-gray-300"></div>}
        <div className="flex items-center gap-1">
          <button className="cursor-pointer rounded hover:bg-primary1 hover:text-white">
            <Settings />
          </button>
        </div>
      </div>
    </div>
  );
}
