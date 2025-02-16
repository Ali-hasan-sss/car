import { useLanguage } from "@/app/context/LanguageContext";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaArrowLeft,
  FaArrowRight,
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
      icon: <FaHome className="text-2xl" />,
      label: t("Home"),
      path: "/admin/dashboard",
    },
    {
      icon: <FaHome className="text-2xl" />,
      label: t("Requests"),
      path: "/admin/dashboard/requests",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      label: t("Users"),
      path: "/admin/dashboard/users",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      label: t("Accounts"),
      path: "users",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      label: t("profile"),
      path: "/admin/dashboard/profile",
    },
    {
      icon: <FaCog className="text-2xl " />,
      label: t("Settings"),
      path: "/admin/dashboard/settings",
    },
  ];

  return (
    <div
      className={`bg-primary1 border p-2  h-screen text-white transition-all duration-300 ${
        isExpanded ? "w-64" : "w-[60px]"
      } flex flex-col`}
      style={{ borderRadius: "0 10px 10px 0" }}
    >
      <div
        className={`flex w-full p-2  ${
          isExpanded ? "justify-end" : "justify-start"
        }`}
      >
        <button
          onClick={onToggle}
          className={`text-2xl rounded-full border p-2 hover:bg-primary1 hover:text-white focus:outline-none `}
        >
          {isExpanded || isArabic ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4 p-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex hover:bg-secondary1 hover:text-gray-800  items-center gap-4 cursor-pointer py-2 rounded ${
                pathName === item.path ? "bg-secondary1 text-gray-800" : ""
              }`}
            >
              {item.icon}
              {isExpanded && <a href={item.path}>{item.label}</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
