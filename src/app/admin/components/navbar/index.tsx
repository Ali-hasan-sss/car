"use client";

import Logo from "@/components/header/top-bar/logo";
import Avatar from "../../../../components/avatar/avatar";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";

export default function AdminNavbar() {
  return (
    <div className="w-full bg-secondary1 shadow-sm z-50  ">
      <div className="container flex items-center  justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Avatar />
        </div>
      </div>
    </div>
  );
}
