import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { NotificationItem } from "@/Types/userTypes";

type Role = "admin" | "customer";

type FetchNotificationsArgs = {
  role: "admin" | "customer";
  pageSize?: number;
  page?: number;
};

interface NotificationsState {
  notifications: NotificationItem[];
  pageCount: number;
  currentPage: number;
  unreadCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  pageCount: 0,
  currentPage: 0,
  unreadCount: 0,
  status: "idle",
  error: null,
};

// ✅ 1. جلب كل الإشعارات

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async ({ role, pageSize = 10, page = 1 }: FetchNotificationsArgs) => {
    const response = await axiosInstance.get(
      `${role}/notifications?page_size=${pageSize}&page=${page}`
    );
    const { data } = response.data;

    return {
      notifications: data.notifications,
      pageCount: data.page_count,
      currentPage: data.currentPage ?? page,
    };
  }
);

// ✅ 2. جلب الإشعارات غير المقروءة
export const fetchUnreadNotifications = createAsyncThunk(
  "notifications/fetchUnread",
  async ({ role }: FetchNotificationsArgs) => {
    const response = await axiosInstance.get(`${role}/notifications/unreaded`);
    return response.data.data.notifications;
  }
);

// ✅ 3. تحديد إشعار كمقروء
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async ({ role, id }: { role: Role; id: number }) => {
    await axiosInstance.put(`${role}/notifications/${id}/meet`);
    return id;
  }
);

// ✅ 4. تحديد كل الإشعارات كمقروءة
export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (role: Role) => {
    await axiosInstance.put(`${role}/notifications/SetAllNotificationsSeen`);
    return;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload.notifications;
        state.pageCount = action.payload.pageCount;
        state.currentPage = action.payload.currentPage;
        state.unreadCount = action.payload.notifications.filter(
          (n) => !n.readed_at
        ).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "خطأ أثناء جلب الإشعارات";
      })

      .addCase(markNotificationAsRead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notif = state.notifications.find((n) => n.id === action.payload);
        if (notif) notif.readed_at = new Date().toISOString();
        state.unreadCount = state.notifications.filter(
          (n) => !n.readed_at
        ).length;
        state.status = "succeeded";
      })

      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          readed_at: new Date().toISOString(),
        }));
        state.unreadCount = 0;
        state.status = "succeeded";
      });
  },
});

export default notificationsSlice.reducer;
