import { useLanguage } from "@/app/context/LanguageContext";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";

interface Register_navProps {
  handleBack?: () => void;
}

export default function Register_nav({ handleBack }: Register_navProps) {
  const { t, isArabic } = useLanguage();
  return (
    <div className="px-[10px] md:px-[50px] login_navbar px-[20px] flex items-center justify-between bg-white h-[60px]">
      <Link href={"/"}>
        <img
          src="/images/logo.png"
          className="h-[40px] w-[147px] "
          alt="logo"
        />
      </Link>
      <div className="flex items-center gap-10">
        {isArabic ? (
          <div
            onClick={handleBack}
            className="btn flex items-center cursor-pointer justify-between gap-1"
          >
            <p className="text-gray-500">{t("Back")}</p>
            <ChevronsRight className="text-text_des" />
          </div>
        ) : (
          <div
            onClick={handleBack}
            className="btn flex items-center cursor-pointer justify-between gap-1"
          >
            <ChevronsLeft className="text-text_des" />
            <p className="text-gray-500">{t("Back")}</p>
          </div>
        )}
        <LanguageSwitcher />
      </div>
    </div>
  );
}
