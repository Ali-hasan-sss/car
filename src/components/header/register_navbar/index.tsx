import { useLanguage } from "@/app/context/LanguageContext";
import LanguageSwitcher from "@/components/btn-switch/LanguageSwitcher";
import Link from "next/link";
interface Register_navProps {
  handleBack: () => void;
}
export default function Register_nav({ handleBack }: Register_navProps) {
  const { t } = useLanguage();
  return (
    <div className="container login_navbar px-[20px] flex items-center justify-between bg-white h-[60px]">
      <Link href={"/"}>
        <img
          src="/images/logo.png"
          className="h-[40px] w-[147px] "
          alt="logo"
        />
      </Link>
      <div className="flex items-center gap-4">
        <div
          onClick={handleBack}
          className="btn flex items-center justify-between gap-3"
        >
          <img src="/images/back.png" alt="back" />
          <p className="text-gray-500">{t("Back")}</p>
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
