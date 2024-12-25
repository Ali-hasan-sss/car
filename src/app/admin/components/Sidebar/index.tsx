import { useLanguage } from "@/app/context/LanguageContext";
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
  const { t } = useLanguage();

  const menuItems = [
    {
      icon: <FaHome className="text-2xl" />,
      label: t("Home"),
      path: "/admin/dashboard/",
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
      path: "/admin/dashboard",
    },
    {
      icon: <FaCog className="text-2xl " />,
      label: t("Settings"),
      path: "/admin/dashboard",
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
          {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4 p-3">
          {isExpanded && (
            <li className="  px-1 text-center gap-4 py-1 ">
              <h3 className="text-xl">{t("Dashboard")}</h3>
            </li>
          )}
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex hover:bg-secondary1 hover:text-gray-800  items-center gap-4 cursor-pointer py-2 rounded"
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
