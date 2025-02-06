import { useLanguage } from "@/app/context/LanguageContext";
import Logo from "@/components/header/top-bar/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaBook,
  FaHome,
  FaRegQuestionCircle,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const { t, isArabic } = useLanguage();
  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();
  const sideItems_top = [
    {
      label: t("Home"),
      icon: <FaHome className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard",
    },
    {
      label: t("My_Actions"),
      icon: (
        <FaRegQuestionCircle className="text-primary1 text-2xl side_icon" />
      ),
      path: "/customer/dashboard/actions",
    },
    {
      label: t("Containers"),
      icon: <FaBook className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard/containers",
    },
    {
      label: t("Containers"),
      icon: <FaBook className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard/containers",
    },
  ];
  const sideItems_buttom = [
    {
      label: t("profile"),
      icon: <FaUser className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard/profile",
    },
    {
      label: t("Sign in"),
      icon: <FaSignInAlt className="text-primary1 text-2xl side_icon" />,
      path: "/",
    },
    {
      label: t("Settings"),
      icon: <FiSettings className="text-primary1 text-2xl side_icon" />,
      path: "/customer/dashboard/settings",
    },
  ];
  return (
    <div
      className={`siedbar h-screen bg-secondary2 overflow-y-auto  flex flex-col gap-[25px] ${
        isExpand ? "w-[40x]" : "w-[200px]"
      } ${isArabic ? "sidearab" : ""} `}
    >
      <div className="header  flex items-center justify-between">
        {!isExpand && <Logo />}

        {!isExpand ? (
          <button
            onClick={() => {
              setIsExpand(!isExpand);
            }}
            className={`w-[20px]  flex ${isExpand ? "m-2" : ""} `}
          >
            <img src="/images/arrow-left.png" alt="arrow" />
            <img src="/images/arrow-left.png" alt="arrow" />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsExpand(!isExpand);
            }}
            className={`w-[20px]  flex ${isExpand ? "m-2" : ""} `}
          >
            <img src="/images/arrow-left.png" alt="arrow" />
            <img src="/images/arrow-left.png" alt="arrow" />
          </button>
        )}
      </div>
      <hr className="text-gray-400" />
      <div className="flex flex-col h-screen items-between justify-between">
        <ul className="">
          {sideItems_top.map((item, index) => (
            <li
              key={index}
              className={`sied_item ${
                pathname === item.path ? "sied_item_active" : ""
              } `}
            >
              <Link className="w-full flex items-start gap-4" href={item.path}>
                {item.icon}
                {!isExpand && <p className="text-gray-400">{item.label}</p>}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="">
          {sideItems_buttom.map((item, index) => (
            <li
              key={index}
              className={`sied_item ${
                pathname === item.path ? "sied_item_active" : ""
              } `}
            >
              <Link className="w-full flex items-start gap-4" href={item.path}>
                {item.icon}
                {!isExpand && <p className="text-gray-400">{item.label}</p>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
