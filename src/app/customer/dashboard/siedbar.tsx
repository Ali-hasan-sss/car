import { useLanguage } from "@/app/context/LanguageContext";
import Logo from "@/components/header/top-bar/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const { t, isArabic } = useLanguage();
  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();
  const sideItems_top = [
    {
      label: t("Orders"),
      icon: (
        <div
          className={`flex items-center justify-center rounded-xl w-[25px] h-[25px] ${
            pathname === "/customer/dashboard" ? "bg-secondary2" : ""
          }`}
        >
          <img src="/images/order.png" alt="orders" />
        </div>
      ),
      path: "/customer/dashboard",
    },
    {
      label: t("Containers"),
      icon: (
        <div
          className={`flex items-center justify-center rounded-xl w-[25px] h-[25px] ${
            pathname === "/customer/dashboard/Containers" ? "bg-secondary2" : ""
          }`}
        >
          <img src="/images/containers.png" alt="containers" />
        </div>
      ),
      path: "/customer/dashboard/actions",
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
      className={`siedbar h-screen bg-secondary1 overflow-y-auto  flex flex-col gap-[25px] ${
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
              <Link
                className="w-full flex items-center  gap-4"
                href={item.path}
              >
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
