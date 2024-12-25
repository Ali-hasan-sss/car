"use client";

import Logo from "@/components/header/top-bar/logo";
import Avatar from "./avatar";
import LanguageSwitcher from "@/components/btn-switch/LanguageSwitcher";

export default function AdminNavbar() {
  return (
    <div className="w-full bg-primary1 shadow z-50  ">
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
