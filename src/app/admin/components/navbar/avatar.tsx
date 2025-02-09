"use client"; // إضافة توجيه "use client"
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isArabic } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useContext(AuthContext); // استخدام السياق لإدارة تسجيل الخروج

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // عناصر القائمة
  const menuItems = [
    {
      id: 1,
      label: t("profile"),
      icon: <FaUser className="text-gray-500 text-2xl" />,
      action: () => console.log("Profile clicked"),
      textColor: "text-gray-800",
      hoverBg: "hover:bg-gray-200",
    },
    {
      id: 2,
      label: t("Logout"),
      icon: <FiLogOut className="text-red-500 text-2xl" />,
      action: () => handleLogout(), // استدعاء دالة تسجيل الخروج
      textColor: "text-red-600",
      hoverBg: "hover:bg-red-200",
    },
  ];

  // دالة تسجيل الخروج
  const handleLogout = () => {
    logout(); // استدعاء دالة logout من السياق
    router.push("/"); // إعادة توجيه المستخدم إلى الصفحة الرئيسية
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end" ref={dropdownRef}>
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDropdown}
        className="avatar flex items-center gap-1 cursor-pointer"
      >
        <div className="w-[25px] rounded-full overflow-hidden">
          <img src="/images/avatar.png" alt="avatar" />
        </div>
        <div>
          <h3>Ali Hasan</h3>
        </div>
        <img src="/images/down.png" alt="down" />
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className={`dropdown-content rounded fixed top-[75px] menu rounded-box z-[100] w-52 p-2 shadow ${
            isArabic ? "left-[15px]" : "right-[15px]"
          }`}
        >
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`p-3 flex items-center gap-2 rounded cursor-pointer ${
                item.hoverBg
              } ${isArabic ? "" : "justify-end"}`}
              onClick={item.action}
            >
              {isArabic ? (
                <>
                  {item.icon}
                  <span className={item.textColor}>{item.label}</span>
                </>
              ) : (
                <>
                  <span className={item.textColor}>{item.label}</span>
                  {item.icon}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
