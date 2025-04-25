"use client";
import { useLanguage } from "../../context/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";
import ActionComfirm from "../messags/actionComfirm";
interface AvatarProps {
  width: string;
}
export default function Avatar({ width }: AvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isArabic } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.userRole;

  const [userData, setUserData] = useState(user || null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }
  }, [user]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClose = () => setModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setLogout());
    router.push("/");
    onClose();
  };

  const goToDashBoard = () => {
    router.push(
      userRole === "ADMIN" ? "/admin/dashboard" : "/customer/dashboard"
    );
  };
  const goToProfile = () => {
    router.push(
      userRole === "ADMIN"
        ? "/admin/dashboard/sitings"
        : "/customer/dashboard/profile"
    );
  };

  const menuItems = [
    {
      id: 1,
      label: t("dashboard"),
      icon: <FaUser className="text-gray-500 text-2xl" />,
      action: goToDashBoard,
      textColor: "text-gray-800",
      hoverBg: "hover:bg-gray-200",
    },
    {
      id: 2,
      label: t("Logout"),
      icon: <FiLogOut className="text-red-500 text-2xl" />,
      action: () => setModalOpen(true),
      textColor: "text-red-600",
      hoverBg: "hover:bg-red-200",
    },
  ];

  return (
    <div className="relative">
      {/* زر فتح القائمة */}
      <button
        ref={buttonRef}
        className="flex px-3 py-1 border items-center text-lg font-bold text-text_title rounded-full focus:outline-none"
        type="button"
        onClick={toggleDropdown}
      >
        <img
          className={`w-[${width}] h-[20px]  me-2`}
          src="/images/avatar.png"
          alt="user photo"
        />
        {userData?.first_name}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* القائمة المنسدلة */}
      {isOpen && isLoggedIn && (
        <div
          ref={dropdownRef}
          className={`absolute  mt-2 w-50 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-50 ${
            isArabic ? "left-0" : "right-0"
          }`}
        >
          <div
            className="px-4 py-3 text-sm text-gray-900 rounded hover:bg-secondary1 cursor-pointer"
            onClick={goToProfile}
          >
            <div className="font-medium text-center">
              {userData?.first_name} {userData?.last_name}
            </div>
            <div className="truncate text-center">{userData?.email}</div>
          </div>

          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                  item.hoverBg
                } ${isArabic ? "justify-start" : "justify-end"}`}
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
        </div>
      )}

      {/* نافذة تأكيد تسجيل الخروج */}
      <ActionComfirm
        open={modalOpen}
        onActionSuccess={handleLogout}
        handleClose={onClose}
        message={t("Confirm_logout")}
      />
    </div>
  );
}
