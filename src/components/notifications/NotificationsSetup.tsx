"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useFirebaseNotifications from "@/utils/useFirebase";

const FCMInitializer = () => {
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  useFirebaseNotifications(userRole === "ADMIN" ? "admin" : "customer");

  // useEffect(() => {
  //   if (typeof window !== "undefined" && "Notification" in window) {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         console.log("✅ تم منح إذن الإشعارات");
  //       } else {
  //         console.warn("🚫 لم يتم منح إذن الإشعارات");
  //       }
  //     });

  //     navigator.serviceWorker
  //       .register("/firebase-messaging-sw.js")
  //       .then((registration) => {
  //         console.log("SW registered:", registration);
  //       })
  //       .catch((err) => {
  //         console.error("SW registration failed:", err);
  //       });
  //   }
  // }, [userRole]);

  return null;
};

export default FCMInitializer;
