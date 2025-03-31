"use client";
import { Typography } from "@mui/material";
import SocialMediaSettings from "./socialMidia";
import { useLanguage } from "../../../../context/LanguageContext";

export default function Settings() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <Typography variant="h4" className="font-bold text-center">
        {t("Settings")}
      </Typography>

      <SocialMediaSettings />
    </div>
  );
}
