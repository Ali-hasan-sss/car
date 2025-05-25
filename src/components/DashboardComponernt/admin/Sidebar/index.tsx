import { useLanguage } from "../../../../context/LanguageContext";
import {
  BellRing,
  Box,
  CarFrontIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Container,
  Home,
  HomeIcon,
  ListChecks,
  Newspaper,
  Settings,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle }) => {
  const { t, isArabic } = useLanguage();

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);
  // تحكم بفتح وإغلاق القائمة المنسدلة
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    if (!isExpanded) {
      onToggle();
    } else {
      setOpenDropdown(openDropdown === label ? null : label);
    }
  };

  const menuItems = [
    {
      icon: <HomeIcon className={`text-3xl`} />,
      label: t("Home"),
      path: "/admin/dashboard",
    },
    {
      icon: <Box className={`text-3xl`} />,
      label: t("Auction"),
      path: "/admin/dashboard/auctions",
    },
    {
      icon: <Container className={`text-3xl`} />,
      label: t("Shipping"),
      path: "/admin/dashboard/shipping",
    },
    {
      icon: <Store className={` text-3xl `} />,
      label: t("Sales"),
      path: "/admin/dashboard/sales",
    },
    {
      icon: <Users className="text-3xl" />,
      label: t("Users"),
      path: "/admin/dashboard/users",
    },

    {
      icon: <BellRing className="text-3xl" />,
      label: t("Notfications"),
      path: "/admin/dashboard/notifications",
    },
    {
      icon: <ListChecks className="text-3xl" />,
      label: t("Pages"),
      path: "#",
      subItems: [
        {
          icon: <Home className="text-3xl" />,
          label: t("Home"),
          path: "/admin/dashboard/home-page",
        },
        {
          icon: <Newspaper className="text-3xl" />,
          label: t("Blogs"),
          path: "/admin/dashboard/blogs",
        },
        {
          icon: <CarFrontIcon className="text-3xl" />,
          label: t("Services"),
          path: "/admin/dashboard/services",
        },
      ],
    },
    {
      icon: <Settings className="text-3xl" />,
      label: t("Settings"),
      path: "/admin/dashboard/settings",
    },
  ];

  return (
    <div
      className={`bg-secondary1 min-h-[90vh] border p-2 overflow-y-auto overflow-x-hidden text-text_title transition-all duration-300 ${
        isExpanded ? "w-[250px]" : "w-[70px]"
      } flex flex-col`}
      style={{ borderRadius: "10px" }}
    >
      <div
        className={`flex  items-center justify-center w-full p-2 ${
          isExpanded ? "justify-end" : "justify-start"
        }`}
      >
        <button
          onClick={onToggle}
          className="text-2xl rounded-full border p-2 hover:bg-primary1 hover:text-white transition-all duration-300 focus:outline-none"
        >
          {isArabic ? (
            isExpanded ? (
              <ChevronRight />
            ) : (
              <ChevronLeft />
            )
          ) : isExpanded ? (
            <ChevronLeft />
          ) : (
            <ChevronRight />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {menuItems.map((item, index) => (
            <li key={index} className="cursor-pointer">
              {/* إذا كان لديه عناصر فرعية */}
              {item.subItems ? (
                <div>
                  <div
                    className={`flex items-center gap-4 p-2 rounded hover:bg-primary1 transition-all duration-300 hover:text-white ${
                      !isExpanded ? "justify-center rounded-full" : ""
                    } ${
                      openDropdown === item.label
                        ? "bg-primary1 text-white"
                        : ""
                    }`}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.icon}
                    {isExpanded && <span className="flex-1">{item.label}</span>}
                    {isExpanded &&
                      (openDropdown === item.label ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      ))}
                  </div>

                  {/* عرض القائمة المنسدلة إذا كانت مفتوحة */}
                  {openDropdown === item.label && isExpanded && (
                    <ul
                      className={`${
                        isArabic ? "border-r pr-3" : "border-l pl-3"
                      }  mt-2 border-gray-400 pl-3 space-y-1`}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.path}
                            className={`flex items-senter gap-2  py-1 px-3 rounded hover:bg-primary1 hover:text-white transition-all duration-300 ${
                              currentPath === subItem.path
                                ? "bg-primary1 text-white"
                                : ""
                            }`}
                          >
                            {subItem.icon} {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path}
                  onClick={(e) => {
                    if (!isExpanded) {
                      e.preventDefault();
                      onToggle();
                      setTimeout(() => {
                        window.location.replace(item.path);
                      }, 300);
                    }
                  }}
                  className={`flex items-center gap-4 p-2 rounded hover:bg-primary1 transition-all duration-300 hover:text-white ${
                    !isExpanded ? "justify-center rounded-full" : ""
                  } ${
                    currentPath === item.path ? "bg-primary1 text-white" : ""
                  }`}
                >
                  {item.icon}
                  {isExpanded && <span>{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
