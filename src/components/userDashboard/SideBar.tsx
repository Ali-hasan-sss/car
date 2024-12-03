import { useContext, useState } from "react";
import { AppContext } from "@/app/context/AppContext";
import Link from "next/link";
import {
  FaArrowAltCircleRight,
  FaArrowCircleLeft,
  FaBell,
  FaFileInvoice,
  FaHome,
  FaTools,
  FaUser,
} from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

const options = [
  {
    label_ar: "الرئيسية",
    label_en: "Home",
    path: "/dashboard/",
    icon: <FaHome className="text-xl icon" />,
  },
  {
    label_ar: "الطلبات",
    label_en: "Orders",
    path: "/dashboard/orders",
    icon: <FiPackage className="text-xl icon" />,
  },
  {
    label_ar: "الفواتير",
    label_en: "Invoices",
    path: "/dashboard/invoices",
    icon: <FaFileInvoice className="text-xl icon" />,
  },
  {
    label_ar: "الإشعارات",
    label_en: "Notifications",
    path: "/dashboard/notifications",
    icon: <FaBell className="text-xl icon" />,
  },
  {
    label_ar: "الملف الشخصي",
    label_en: "Profile",
    path: "/dashboard/profile",
    icon: <FaUser className="text-xl icon" />,
  },
  {
    label_ar: "الإعدادات",
    label_en: "Settings",
    path: "/dashboard/settings",
    icon: <FaTools className="text-xl icon" />,
  },
];

const Sidebar = () => {
  const { isArabic, isDarkMode } = useContext(AppContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`sidebar h-screen overflow-y-outo ${
        isDarkMode ? "dark-bg" : "light-bg  "
      } ${isCollapsed ? "w-14" : "w-60"} ${
        isArabic
          ? "shadow-[-4px_0px_7px_rgba(0,0,0,0.1)]"
          : "shadow-[4px_0px_7px_rgba(0,0,0,0.1)]"
      } transition-all duration-300`}
      style={{ scrollbarWidth: "thin" }}
    >
      {isArabic ? (
        <button
          onClick={toggleSidebar}
          className="p-2 focus:outline-none"
          aria-label={isArabic ? "تبديل الشريط الجانبي" : "Toggle sidebar"}
        >
          {isCollapsed ? (
            <FaArrowCircleLeft
              className={`text-xl mr-2 mt-1 ${
                isDarkMode
                  ? "  text-red-500 hover:text-yellow-600"
                  : "  text-green-600 hover:text-green-500"
              } `}
            />
          ) : (
            <FaArrowAltCircleRight
              className={`text-xl mr-2 mt-1 ${
                isDarkMode
                  ? "  text-red-500 hover:text-yellow-600"
                  : "  text-green-600 hover:text-green-500"
              } `}
            />
          )}
        </button>
      ) : (
        <button
          onClick={toggleSidebar}
          className="p-2 focus:outline-none"
          aria-label={isArabic ? "تبديل الشريط الجانبي" : "Toggle sidebar"}
        >
          {isCollapsed ? (
            <FaArrowAltCircleRight
              className={`text-xl ml-2 mt-1 ${
                isDarkMode
                  ? "  text-red-500 hover:text-yellow-600"
                  : "  text-green-600 hover:text-green-500"
              } `}
            />
          ) : (
            <FaArrowCircleLeft
              className={`text-xl ml-2 mt-1 ${
                isDarkMode
                  ? "  text-red-500 hover:text-yellow-600"
                  : "  text-green-600 hover:text-green-500"
              } `}
            />
          )}
        </button>
      )}
      <ul className="mt-4">
        {options.map((option, index) => (
          <li key={index} className="m-2 ">
            <Link
              href={option.path}
              className={`nav-item flex item-center p-2 gap-2  hover:text-red-600 ${
                isDarkMode ? "text-blue-300" : "text-blue-800"
              } `}
            >
              {option.icon}
              {!isCollapsed && (
                <span className="transition-opacity duration-300">
                  {isArabic ? option.label_ar : option.label_en}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
