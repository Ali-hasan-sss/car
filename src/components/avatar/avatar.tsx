"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";
import ActionComfirm from "../messags/actionComfirm";
import { ChevronDown } from "lucide-react";

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isArabic } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  // جلب بيانات المستخدم من Redux
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);

  // تحديث بيانات المستخدم محليًا
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

  const onClose = () => setModalOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setLogout());
    router.push("/");
    onClose();
  };

  const goToDashBoard = () => {
    if (userRole === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/customar/dashboard");
    }
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
    <div className="dropdown dropdown-bottom dropdown-end" ref={dropdownRef}>
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDropdown}
        className="avatar flex items-center gap-2 cursor-pointer"
      >
        <div className="w-[25px] rounded-full overflow-hidden">
          <img src="/images/avatar.png" alt="avatar" />
        </div>
        <div>
          <h3>
            {userData?.firstName} {userData?.lastName}
          </h3>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-500" />
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
      <ActionComfirm
        open={modalOpen}
        onActionSuccess={handleLogout}
        handleClose={onClose}
        message={t("Confirm_logout")}
      />
    </div>
  );
}
