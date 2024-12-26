import LanguageSwitcher from "@/components/btn-switch/LanguageSwitcher";
import Link from "next/link";

export default function Register_nav() {
  return (
    <div className="container login_navbar px-[20px] flex items-center justify-between bg-white h-[60px]">
      <Link href={"/"}>
        <img
          src="/images/logo.png"
          className="h-[40px] w-[147px] "
          alt="logo"
        />
      </Link>
      <LanguageSwitcher />
    </div>
  );
}
