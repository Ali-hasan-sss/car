import { useLanguage } from "../../../context/LanguageContext";
import { Download, FilterIcon, Plus } from "lucide-react";
interface ActionConfig {
  add?: boolean;
  filter?: boolean;
  export?: boolean;
  filterActiom?: () => void;
  addNewActiom?: () => void;
}
interface TableHeaderProps {
  title: string;
  action: ActionConfig;
}
export default function TableHeader({ title, action }: TableHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-between">
      <div className="headind flex flex-col p-[10px] ">
        <h2 className="text-text_title text-2xl font-bold"> {title}</h2>
      </div>
      <div className="flex items-center gap-3">
        {action.filter && (
          <div
            className="flex button_bordered text-sm px-2 py-1 items-center gap-1"
            onClick={action.filterActiom}
          >
            <FilterIcon className="text-sm" /> {t("Filter")}
          </div>
        )}
        {action.export && (
          <div className="flex button_bordered text-sm px-2 py-1 items-center gap-1">
            <Download className="text-sm" /> {t("Export")}
          </div>
        )}
        {action.add && (
          <div
            className="flex button_outline text-sm  p-1 items-center gap-1"
            onClick={action.addNewActiom}
          >
            <Plus className="text-sm" /> {t("Add") + " " + t("New")}
          </div>
        )}
      </div>
    </div>
  );
}
