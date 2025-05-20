// components/NotificationToggle.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Switch, FormControlLabel } from "@mui/material";
import { useLanguage } from "@/context/LanguageContext";

export default function NotificationToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null
  );
  console.log(permission);
  const { t } = useLanguage();
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === "granted");
    }
  }, []);

  const handleToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    if (checked) {
      // المستخدم يريد تفعيل الإشعارات
      if (Notification.permission === "default") {
        const result = await Notification.requestPermission();
        setPermission(result);
        setIsEnabled(result === "granted");

        if (result !== "granted") {
          toast.warning("لم يتم منح الإذن. الرجاء تفعيله من إعدادات المتصفح.");
        }
      } else if (Notification.permission === "denied") {
        toast.warning(
          "تم حظر الإشعارات. يجب تفعيلها يدويًا من إعدادات المتصفح."
        );
      } else {
        // الإذن مفعّل مسبقًا
        setIsEnabled(true);
      }
    } else {
      // المستخدم يحاول الإيقاف
      toast.warning("لإيقاف الإشعارات، يجب تعديل الإذن من إعدادات المتصفح.");
    }
  };

  return (
    <FormControlLabel
      control={
        <Switch checked={isEnabled} onChange={handleToggle} color="primary" />
      }
      label={t("Notfications")}
      labelPlacement="start"
      sx={{
        color: "text.primary",
        "& .MuiFormControlLabel-label": {
          fontSize: "1rem",
        },
      }}
    />
  );
}
