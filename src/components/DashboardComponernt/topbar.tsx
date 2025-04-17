import Avatar from "@/components/avatar/avatar";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";
import { FaBell } from "react-icons/fa";
import Logo from "../header/top-bar/logo";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between md:justify-end gap-[16px]">
      <div className="md:hidden">
        <Logo />
      </div>
      <div className="flex items-center justify-center gap-4">
        <LanguageSwitcher />
        <FaBell className="text-gray-400 text-2xl cursor-pointer" />
        <Avatar width="8" />
      </div>
    </div>
  );
}
