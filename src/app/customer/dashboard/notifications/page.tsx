"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/store/slice/notificationsSlice";
import { useAppDispatch } from "@/store/Reducers/hooks";
import { getTimeAgo } from "@/utils/orderUtils";
import { useLanguage } from "@/context/LanguageContext";
import CustomPagination from "@/components/pagination/extrnalPagenation";

const NotificationsPage = () => {
  const { t, isArabic } = useLanguage();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const role = useSelector((state: RootState) =>
    state.auth.user?.userRole === "ADMIN" ? "admin" : "customer"
  );
  const { notifications, unreadCount, pageCount } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    if (role && currentPage) {
      dispatch(fetchNotifications({ role, pageSize: 10, page: currentPage }));
    }
  }, [dispatch, role, currentPage]);
  const handleMarkAsRead = (notificationId: number) => {
    dispatch(markNotificationAsRead({ role, id: notificationId }));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead(role));
  };

  return (
    <div className="w-full mx-auto  py-5 md:px-10">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl font-bold mb-4 text-center">
          {t("Notfications")}
        </h2>

        {unreadCount > 0 && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleMarkAllAsRead}
              className="button_outline px-3 py-1 rounded transition"
            >
              {t("mark_all_read")}
            </button>
          </div>
        )}
      </div>

      {notifications ? (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`relative border rounded-lg p-4 shadow-sm ${
                notif.readed_at ? "bg-gray-100" : "bg-white"
              }`}
            >
              {!notif.readed_at && (
                <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-400" />
              )}
              <div className="flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold">{notif.title}</h3>
                {!notif.readed_at && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="mt-2 text-sm border border-primary1 hover:bg-primary1 hover:text-white p-1 rounded text-gray-900 hover:underline"
                  >
                    {t("mark_as_read")}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-600">{notif.message}</p>

              {/* {notif.payload && (
              <div className="text-sm text-gray-700 mt-2">
                نوع: {notif.payload.type}، معرف المستخدم: {notif.payload.uId}
              </div>
            )} */}
              <div className="flex w-full items-center justify-between">
                <p className="text-xs text-gray-500 mt-1">
                  {dayjs
                    .utc(notif.created_at)
                    .local()
                    .format("YYYY-MM-DD HH:mm")}
                </p>

                <span className="bg-blue-400 text-white px-2 py-1 rounded-full text-xs">
                  {t("time_ago")} :{" "}
                  {getTimeAgo(notif.created_at, isArabic ? "ar" : "en")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("no_notfications")}</p>
      )}
      <CustomPagination
        totalPages={pageCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default NotificationsPage;
