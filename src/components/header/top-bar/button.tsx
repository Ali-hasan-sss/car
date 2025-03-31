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
    <Avatar />
  ) : (
    <div className="flex w-[209px] h-[57px] p-[5px] gap-[8px] items-center">
      <Link
        href="/login"
        className="button_outline  w-[89px] h-[40px]  py-[10px] px-[14px] flex items-center justify-center"
      >
        {t("Sign_in")}
      </Link>
      <Link
        href="/register"
        className="button_bordered w-[89px] h-[40px] py-[10px] px-[14px] flex items-center justify-center"
      >
        {t("Register")}
      </Link>
    </div>
  );
}
