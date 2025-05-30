"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function EmailVerify() {
  const { t } = useLanguage();
  return (
    <div className="flex w-full h-[100vh] bg-secondary1 items-center justify-center">
      <div className="flex flex-col gap-5 w-[350px] md:w-[400px] items-center justify-center rounded-xl shadow bg-white px-5 py-6">
        <img src="/images/success.png" className="w-20" alt="" />
        <h2 className="text-xl font-bold">{t("Success")}!</h2>
        <p>{t("verify_email_success")}</p>
        <button
          className="w-3/4 button_outline rounded-xl p-2 "
          onClick={() => window.location.replace("/register/complete")}
        >
          {t("Go_to_dashboard")}
        </button>
      </div>
    </div>
  );
}
