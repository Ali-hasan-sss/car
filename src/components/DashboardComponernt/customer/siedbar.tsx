import { useLanguage } from "../../../context/LanguageContext";
import Logo from "@/components/NavBar/top-bar/logo";
import {
  BellRing,
  Box,
  ChevronsLeft,
  ChevronsRight,
  Container,
  HomeIcon,
  Settings,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtomNavBar from "./buttomNav";
interface SidebarProps {
  setisExpand: (val: boolean) => void;
}
export default function Sidebar({ setisExpand }: SidebarProps) {
  const { t, isArabic } = useLanguage();
  const [isExpand, setIsExpand] = useState(false);

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  const sideItems_top = [
    {
      label: t("Home"),
      icon: (
        <HomeIcon
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            currentPath === "/customer/dashboard"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard",
      tooltip: t("Home"),
    },
    {
      label: t("Auction"),
      icon: (
        <Box
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            currentPath === "/customer/dashboard/auction"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/auction",
      tooltip: t("Auction"),
    },
    {
      label: t("Shipping"),
      icon: (
        <Container
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            currentPath === "/customer/dashboard/shipping"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/shipping",
      tooltip: t("Shipping"),
    },
    {
      label: t("Sales"),
      icon: (
        <Store
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            currentPath === "/customer/dashboard/salles"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/salles",
      tooltip: t("Sales"),
    },
    {
      label: t("Notfications"),
      icon: (
        <BellRing
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            currentPath === "/customer/dashboard/notifications"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/notifications",
      tooltip: t("Notifications"), // التعديل هنا
    },
  ];

  const sideItems_buttom = [
    {
      label: t("profile"),
      icon: (
        <User
          className={`text-primary1 rounded-lg text-2xl side_icon ${
            currentPath === "/customer/dashboard/profile"
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
            currentPath === "/customer/dashboard/settings"
              ? "bg-primary1 text-white"
              : ""
          }`}
        />
      ),
      path: "/customer/dashboard/settings",
    },
  ];
  return (
    <>
      <div
        className={`siedbar hidden md:flex h-screen bg-secondary1 overflow-y-auto   flex-col gap-[25px] ${
          isExpand ? "w-[40x] " : "w-[200px]"
        } ${isArabic ? "sidearab" : ""} `}
      >
        <div className="header  flex items-center justify-between">
          {!isExpand ? <Logo /> : <div className="h-[73px] w-4"></div>}

          {!isExpand ? (
            <button
              onClick={() => {
                setIsExpand(!isExpand);
                setisExpand(isExpand);
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
                setisExpand(isExpand);
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
                  currentPath === item.path ? "sied_item_active" : ""
                } `}
              >
                <Link
                  className="w-full flex items-center gap-4"
                  href={item.path}
                  title={isExpand ? item.tooltip : ""}
                >
                  {item.icon}
                  {!isExpand && (
                    <p className="text-gray-400 text-sm">{item.label}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="">
            {sideItems_buttom.map((item, index) => (
              <li
                key={index}
                className={`sied_item mb-1 flex items-center gap-2 ${
                  currentPath === item.path ? "sied_item_active" : ""
                } `}
              >
                <Link
                  className="w-full flex items-center gap-4"
                  href={item.path}
                >
                  {item.icon}
                  {!isExpand && (
                    <p className="text-gray-400 text-sm">{item.label}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ButtomNavBar items={sideItems_top} />
    </>
  );
}
