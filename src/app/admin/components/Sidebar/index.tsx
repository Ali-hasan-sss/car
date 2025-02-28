import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaHome,
  FaArrowLeft,
  FaArrowRight,
  FaClipboardList,
  FaUserFriends,
  FaCogs,
  FaNewspaper,
  FaSlidersH,
} from "react-icons/fa";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle }) => {
  const { t, isArabic } = useLanguage();
  const pathName = usePathname();
  const menuItems = [
    {
      icon: <FaHome className="text-3xl" />,
      label: t("Home"),
      path: "/admin/dashboard",
    },
    {
      icon: <FaClipboardList className="text-3xl" />,
      label: t("Requests"),
      path: "/admin/dashboard/requests",
    },
    {
      icon: <FaUserFriends className="text-3xl" />,
      label: t("Users"),
      path: "/admin/dashboard/users",
    },
    {
      icon: <FaCogs className="text-3xl" />,
      label: t("Services"),
      path: "/admin/dashboard/services",
    },
    {
      icon: <FaNewspaper className="text-3xl" />,
      label: t("Blogs"),
      path: "/admin/dashboard/blogs",
    },
    {
      icon: <FaSlidersH className="text-3xl" />,
      label: t("Settings"),
      path: "/admin/dashboard/settings",
    },
  ];

  return (
    <div
      className={`bg-secondary1 border p-2  overflow-y-auto overflow-x-hidden text-text_title transition-all duration-300 ${
        isExpanded ? "w-64" : "w-[75px]"
      } flex flex-col`}
      style={{ borderRadius: "10px" }}
    >
      <div
        className={`flex items-center justify-center w-full p-2  ${
          isExpanded ? "justify-end" : "justify-start"
        }`}
      >
        <button
          onClick={onToggle}
          className={`text-2xl rounded-full border p-2 hover:bg-primary1 hover:text-white transition-all duration-300 focus:outline-none `}
        >
          {!isExpanded && !isArabic ? (
            <FaArrowRight />
          ) : isExpanded && !isArabic ? (
            <FaArrowLeft />
          ) : isArabic && !isExpanded ? (
            <FaArrowLeft />
          ) : (
            <FaArrowRight />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4 p-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex hover:bg-primary1 transition-all duration-300 hover:text-white ${
                !isExpanded ? "justify-center" : ""
              } items-center gap-4 cursor-pointer  p-2 rounded ${
                pathName === item.path ? "bg-primary1 text-white" : ""
              }`}
            >
              <Link href={item.path}> {item.icon}</Link>
              {isExpanded && (
                <Link className="w-full" href={item.path}>
                  {item.label}
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
