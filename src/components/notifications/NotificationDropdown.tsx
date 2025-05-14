"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/Reducers/hooks";
import { getTimeAgo } from "@/utils/orderUtils";
import { fetchNotifications } from "@/store/slice/notificationsSlice";
import { useRouter } from "next/navigation";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, isArabic } = useLanguage();
  const router = useRouter();
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };
  const dispatch = useAppDispatch();
  const role = useSelector((state: RootState) =>
    state.auth.user?.userRole === "ADMIN" ? "admin" : "customer"
  );
  const { notifications, unreadCount } = useSelector(
    (state: RootState) => state.notifications
  );
  useEffect(() => {
    if (role) {
      dispatch(fetchNotifications({ role, pageSize: 10 }));
    }
  }, [dispatch, role]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative mt-1 rounded-full border p-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary1 focus:outline-none"
        type="button"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 14 20">
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57V1.1a1 1 0 0 0-2 0v2.364a5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>

        {unreadCount > 0 && (
          <div className="absolute -top-1 -end-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}
      </button>

      {open && (
        <div
          className={`z-20 absolute ${
            isArabic ? "left-2" : "right-2"
          } mt-2 w-96 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow`}
        >
          <div className="block px-4 py-2 font-medium text-center rounded-t-lg text-gray-700 bg-gray-300 ">
            {t("Notfications")}
          </div>
          <div className="divide-y w-full divide-gray-100 ">
            {notifications.map((notification) => (
              <a
                key={notification.id}
                href={`/${role}/dashboard/notifications`}
                className="flex px-4 py-3 hover:bg-gray-100 "
              >
                <div className="relative w-full ps-3">
                  {!notification.readed_at && (
                    <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-400" />
                  )}
                  <div className="font-semibold text-gray-900 ">
                    {notification.title}
                  </div>
                  <div className="text-gray-500 text-sm mb-1.5 ">
                    {notification.message}
                  </div>
                  <div className="text-xs text-blue-600">
                    <span className="bg-blue-400 text-white px-2 py-1 rounded-full text-xs">
                      {t("time_ago")} : {getTimeAgo(notification.created_at)}
                    </span>
                  </div>
                </div>
              </a>
            ))}
            <div
              onClick={() => router.push(`/${role}/dashboard/notifications`)}
              className="block px-4 py-1 font-medium text-center cursor-pointer rounded-b-lg text-gray-700 bg-gray-200 hover:bg-gray-100"
            >
              {t("see_all_noti")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
