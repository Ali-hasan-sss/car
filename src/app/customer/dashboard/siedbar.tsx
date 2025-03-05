import { useLanguage } from "@/app/context/LanguageContext";
import Logo from "@/components/header/top-bar/logo";
import {
  Box,
  ChevronsLeft,
  ChevronsRight,
  Container,
  Settings,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const { t, isArabic } = useLanguage();
  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();
  const sideItems_top = [
    {
      label: t("Orders"),
      icon: (
        <ShoppingCart
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            pathname === "/customer/dashboard/orders"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/orders",
    },
    {
      label: t("Auction"),
      icon: (
        <Box
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            pathname === "/customer/dashboard/auction"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/auction",
    },
    {
      label: t("Shipping"),
      icon: (
        <Container
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            pathname === "/customer/dashboard/shipping"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/shipping",
    },
    {
      label: t("Salles"),
      icon: (
        <Store
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            pathname === "/customer/dashboard/salles"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/salles",
    },
  ];
  const sideItems_buttom = [
    {
      label: t("profile"),
      icon: (
        <User
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            pathname === "/customer/dashboard/profile"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/profile",
    },

    {
      label: t("Settings"),
      icon: (
        <Settings
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            pathname === "/customer/dashboard/settings"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/settings",
    },
  ];
  return (
    <div
      className={`siedbar h-screen bg-secondary1 overflow-y-auto  flex flex-col gap-[25px] ${
        isExpand ? "w-[40x] " : "w-[200px]"
      } ${isArabic ? "sidearab" : ""} `}
    >
      <div className="header  flex items-center justify-between">
        {!isExpand ? <Logo /> : <div className="h-[73px] w-4"></div>}

        {!isExpand ? (
          <button
            onClick={() => {
              setIsExpand(!isExpand);
            }}
            className={`w-[25px] rounded-full hover:bg-primary1 hover:text-white p-1 flex items-center justify-center ${
              isExpand ? "m-2" : ""
            } `}
          >
            {isArabic ? (
              <ChevronsRight className="text-2xl " />
            ) : (
              <ChevronsLeft className="text-2xl " />
            )}
          </button>
        ) : (
          <button
            onClick={() => {
              setIsExpand(!isExpand);
            }}
            className={`w-[25px] rounded-full hover:bg-primary1 hover:text-white p-1 flex items-center justify-center  ${
              isExpand ? "m-2" : ""
            } `}
          >
            {isArabic ? (
              <ChevronsLeft className="text-2xl " />
            ) : (
              <ChevronsRight className="text-2xl " />
            )}
          </button>
        )}
      </div>
      <hr className="text-gray-400" />
      <div className="flex flex-col h-screen items-between justify-between">
        <ul className="">
          {sideItems_top.map((item, index) => (
            <li
              key={index}
              className={`sied_item mb-1 flex items-center gap-2 ${
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
              className={`sied_item mb-1 flex items-center gap-2 ${
                pathname === item.path ? "sied_item_active" : ""
              } `}
            >
              <Link className="w-full flex items-center gap-4" href={item.path}>
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
