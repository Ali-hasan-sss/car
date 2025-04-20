"use client";

import Avatar from "@/components/avatar/avatar";
import { useLanguage } from "../../../context/LanguageContext";
import Link from "next/link";
import { useSelector } from "react-redux"; // استيراد useSelector
import { RootState } from "@/store/store"; // استيراد RootState للوصول إلى الحالة من Redux

export default function Navbutton() {
  const { t } = useLanguage();

  // الوصول إلى حالة تسجيل الدخول من Redux
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? (
    <Avatar width="16" />
  ) : (
    <div className="flex p-[5px] gap-[8px] items-center">
      <Link
        href="/login"
        className="button_outline py-1 md:py-3 px-2 md:px-4 text-xs font-bold flex items-center justify-center"
      >
        {t("Sign_in")}
      </Link>
      <Link
        href="/register"
        className="button_bordered py-1 md:py-3 px-2 md:px-4 text-xs font-bold flex items-center justify-center"
      >
        {t("Register")}
      </Link>
    </div>
  );
}
