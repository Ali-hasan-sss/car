"use client";
import { Typography } from "@mui/material";
import SocialMediaSettings from "./socialMidia";
import { useLanguage } from "../../../../context/LanguageContext";
import { useEffect, useState } from "react";
import { SettingsIcon } from "lucide-react";
import Accounts from "./accounts";
import CarTypes from "./manufacturers";
import CountryList from "./countries";

export default function Settings() {
  const { t } = useLanguage();
  const [activeTap, setActiveTap] = useState<
    "contact" | "manufacturers" | "countries" | "accounts"
  >("contact");
  useEffect(() => {
    if (window !== undefined) {
      const storedActive = localStorage.getItem("activeTap");
      if (
        storedActive === "contact" ||
        storedActive === "countries" ||
        storedActive === "accounts" ||
        storedActive === "manufacturers"
      )
        setActiveTap(storedActive || "accounts");
    }
  }, []);
  return (
    <div className=" w-full py-5 bg-white shadow-md rounded-md space-y-6">
      <div className="flex px-4 items-center gap-3">
        <SettingsIcon className="fill-primary1 text-white" />
        <Typography className="text-2xl font-bold">{t("Settings")}</Typography>
      </div>
      <div className="flex px-5 pt-2 bg-primary1 border-t-[2px] border-primary1  items-center ">
        <button
          onClick={() => {
            setActiveTap("contact");
            localStorage.setItem("activeTap", "contact");
          }}
          className={`px-5 py-1  rounded-t-xl ${
            activeTap === "contact" ? "bg-white text-gray-900 " : "text-gray-50"
          }  hover:bg-white hover:text-gray-900 border-r-[2px] border-primary1`}
        >
          {t("contact")}
        </button>
        <button
          onClick={() => {
            setActiveTap("manufacturers");
            localStorage.setItem("activeTap", "manufacturers");
          }}
          className={`px-5 py-1 rounded-t-xl ${
            activeTap === "manufacturers"
              ? "bg-white text-gray-900"
              : " text-gray-50"
          } hover:bg-white hover:text-gray-900 border-r-[2px] border-primary1`}
        >
          {t("Manufacturers")}
        </button>
        <button
          onClick={() => {
            setActiveTap("countries");
            localStorage.setItem("activeTap", "countries");
          }}
          className={`px-5 py-1 rounded-t-xl ${
            activeTap === "countries"
              ? "bg-white text-gray-900"
              : " text-gray-50"
          } hover:bg-white hover:text-gray-900 border-r-[2px] border-primary1`}
        >
          {t("Countries")}
        </button>
        <button
          onClick={() => {
            setActiveTap("accounts");
            localStorage.setItem("activeTap", "accounts");
          }}
          className={`px-5 py-1  rounded-t-xl ${
            activeTap === "accounts" ? "bg-white text-gray-900" : "text-gray-50"
          } hover:bg-white hover:text-gray-900 border-r-[2px] border-primary1`}
        >
          {t("Accounts")}
        </button>
      </div>
      {activeTap === "contact" && (
        <div className="flex w-full px-5 items-center justify-between bg-white">
          <SocialMediaSettings />
        </div>
      )}
      {activeTap === "accounts" && (
        <div className="flex w-full bg-white">
          <Accounts />
        </div>
      )}
      {activeTap === "manufacturers" && (
        <div className="flex w-full px-5 h-[50vh] overflow-y-auto bg-white">
          <CarTypes />
        </div>
      )}
      {activeTap === "countries" && (
        <div className="flex w-full px-5 bg-white">
          <CountryList />
        </div>
      )}
    </div>
  );
}
