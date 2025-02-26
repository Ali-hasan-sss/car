"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isArabic } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  //click outsied menu
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
      action: () => handleLogout(),
      textColor: "text-red-600",
      hoverBg: "hover:bg-red-200",
    },
  ];

  const handleLogout = () => {
    // هنا يمكنك تحديث حالة Redux لتسجيل الخروج
    // dispatch(setLogout());
    router.push("/");
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
      {isOpen && isLoggedIn && (
        <ul
          tabIndex={0}
          className={`bg-secondary1 rounded fixed top-[60px] menu rounded-box z-[1000] w-52 p-2 shadow ${
            isArabic ? "left-[40px]" : "right-[40px]"
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
