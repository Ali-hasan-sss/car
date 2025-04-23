// components/NotificationsCard.tsx
import { Bell } from "lucide-react";
import React from "react";

interface NotificationsCardProps {
  unreadCount: number;
}

const NotificationsCard: React.FC<NotificationsCardProps> = ({
  unreadCount,
}) => (
  <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">الإشعارات غير المقروءة</p>
      <p className="text-2xl font-bold text-gray-800">{unreadCount}</p>
    </div>
    <div className="text-3xl text-yellow-500">
      <Bell />
    </div>
  </div>
);

export default NotificationsCard;
