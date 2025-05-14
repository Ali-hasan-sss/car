"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useFirebaseNotifications from "@/utils/useFirebase"; // يجب أن تكون دالة قابلة للنداء فقط وليس هوك

const FCMInitializer = () => {
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  useFirebaseNotifications(userRole === "ADMIN" ? "admin" : "customer");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("SW registered:", registration);
        })
        .catch((err) => {
          console.error("SW registration failed:", err);
        });
    }
  }, [userRole]);

  return null;
};

export default FCMInitializer;
