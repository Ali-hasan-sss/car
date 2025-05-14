import { useEffect, useRef } from "react";
import { getToken } from "firebase/messaging";
import axiosInstance from "./axiosInstance";
import { messaging } from "../../firebaseConfig";
import axios from "axios";

const useFirebaseNotifications = (role: "admin" | "customer") => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    const initNotifications = async () => {
      if (
        typeof window === "undefined" ||
        !("Notification" in window) ||
        Notification.permission === "denied" ||
        hasInitialized.current
      ) {
        return;
      }

      hasInitialized.current = true;

      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        const alreadyRegistered = registrations.some((reg) =>
          reg.active?.scriptURL.includes("firebase-messaging-sw.js")
        );

        if (!alreadyRegistered) {
          await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          console.log("Service Worker registered.");
        }

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission not granted.");
          return;
        }

        if (!messaging || !process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
          console.warn("Firebase messaging or VAPID key not available.");
          return;
        }

        const oldToken = localStorage.getItem("fcmToken");
        const newToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (newToken && newToken !== oldToken) {
          const endpoint =
            role === "admin"
              ? "/admin/editFirebaseToken"
              : "/customer/editFirebaseToken";

          await axiosInstance.post(endpoint, {
            old_firebase_token: oldToken || " ",
            firebase_token: newToken,
          });

          localStorage.setItem("fcmToken", newToken);
          console.log("FCM token updated.");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("FCM init error:", {
            message: err.message,
            response: err.response?.data,
          });
        } else {
          console.error("FCM init unknown error:", err);
        }
      }
    };

    initNotifications();
  }, [role]);
};

export default useFirebaseNotifications;
