import { getToken } from "firebase/messaging";
import { messaging } from "../../firebaseConfig";
import axiosInstance from "./axiosInstance";

export const updateFirebaseToken = async (
    role: "customer" | "admin",
    oldToken?: string
  ) => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("لم يتم منح إذن الإشعارات");
        return;
      }
  
      const newToken = await getToken(messaging);
      console.log("FCM Token:", newToken);
  
      // تحديد نقطة النهاية بناءً على نوع المستخدم
      const endpoint =
        role === "admin"
          ? "admin/editFirebaseToken" 
          : "customer/editFirebaseToken"; 
  
      await axiosInstance.post(endpoint, {
        old_firebase_token: oldToken || "",
        firebase_token: newToken,
      });
  
      console.log(`تم تحديث توكن فايربيز بنجاح في الخادم لـ ${role}!`);
    } catch (error) {
      console.error(`خطأ أثناء تحديث التوكن لـ ${role}:`, error);
    }
  };
  