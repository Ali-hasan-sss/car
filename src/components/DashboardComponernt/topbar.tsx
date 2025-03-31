import Avatar from "@/components/avatar/avatar";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";
import { FaBell } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="flex items-center justify-end gap-[16px]">
      <div className="flex items-center justify-center gap-4">
        <LanguageSwitcher />
        <FaBell className="text-gray-400 text-2xl cursor-pointer" />
        <Avatar />
      </div>
    </div>
  );
}
