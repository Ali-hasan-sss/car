import { useLanguage } from "@/app/context/LanguageContext";
import {
  BellRing,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  HomeIcon,
  ListChecks,
  Newspaper,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle }) => {
  const { t, isArabic } = useLanguage();
  const pathName = usePathname();

  // تحكم بفتح وإغلاق القائمة المنسدلة
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const menuItems = [
    {
      icon: <HomeIcon className="text-3xl" />,
      label: t("Home"),
      path: "/admin/dashboard",
    },
    {
      icon: <ListChecks className="text-3xl" />,
      label: t("Requests"),
      path: "/admin/dashboard/requests",
    },
    {
      icon: <Users className="text-3xl" />,
      label: t("Users"),
      path: "/admin/dashboard/users",
    },
    {
      icon: <Wrench className="text-3xl" />,
      label: t("Services"),
      path: "/admin/dashboard/services",
    },
    {
      icon: <Newspaper className="text-3xl" />,
      label: t("Blogs"),
      path: "/admin/dashboard/blogs",
    },
    {
      icon: <BellRing className="text-3xl" />,
      label: t("Notifications"),
      path: "/admin/dashboard/notifications",
    },
    {
      icon: <Settings className="text-3xl" />,
      label: t("Systim_Category"),
      path: "#",
      subItems: [
        {
          label: t("Category"),
          path: "/admin/dashboard/category",
        },
        {
          label: t("Manufacturers"),
          path: "/admin/dashboard/manufacturers",
        },
        {
          label: t("Countries"),
          path: "/admin/dashboard/countries",
        },
      ],
    },
    {
      icon: <Settings className="text-3xl" />,
      label: t("Settings"),
      path: "#",
      subItems: [
        {
          label: t("Settings"),
          path: "/admin/dashboard/settings",
        },
        {
          label: t("Accounts"),
          path: "/admin/dashboard/settings/accounts",
        },
        { label: t("Security"), path: "/admin/dashboard/settings/" },
      ],
    },
  ];

  return (
    <div
      className={`bg-secondary1 border p-2 overflow-y-auto overflow-x-hidden text-text_title transition-all duration-300 ${
        isExpanded ? "w-64" : "w-[70px]"
      } flex flex-col`}
      style={{ borderRadius: "10px" }}
    >
      {/* زر التحكم في فتح/إغلاق السايدبار */}
      <div
        className={`flex items-center justify-center w-full p-2 ${
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
                    <ul className=" border-l mt-2 border-gray-400 pl-3 space-y-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.path}
                            className={`block p-2 rounded hover:bg-primary1 hover:text-white transition-all duration-300 ${
                              pathName === subItem.path
                                ? "bg-primary1 text-white"
                                : ""
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center gap-4 p-2 rounded hover:bg-primary1 transition-all duration-300 hover:text-white ${
                    !isExpanded ? "justify-center rounded-full" : ""
                  } ${pathName === item.path ? "bg-primary1 text-white" : ""}`}
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
