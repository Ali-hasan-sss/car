import Avatar from "@/components/avatar/avatar";
import { useLanguage } from "@/app/context/LanguageContext";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";
import Search_input from "@/components/inputs/search_input";
import { FaBell } from "react-icons/fa";

export default function Topbar() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between gap-[16px]">
      <div className="w-1/2">
        <Search_input placeholder={t("Search") + "..."} />
      </div>
      <div className="flex items-center justify-center gap-4">
        <LanguageSwitcher />
        <FaBell className="text-gray-400 text-2xl cursor-pointer" />
        <Avatar />
      </div>
    </div>
  );
}
