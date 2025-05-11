"use client";

import Logo from "@/components/NavBar/top-bar/logo";
import Avatar from "../../../avatar/avatar";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";

export default function AdminNavbar() {
  return (
    <div className="w-full bg-secondary1 shadow-sm z-50  ">
      <div className="px-[10px] md:px-[50px] py-5 flex items-center  justify-between">
        <Logo />
        <div className="flex items-center gap-[40px]">
          <LanguageSwitcher />
          <Avatar width="8" />
        </div>
      </div>
    </div>
  );
}
