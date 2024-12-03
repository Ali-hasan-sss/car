"use client";
import React, { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
import { FormControlLabel, Switch } from "@mui/material";
const RegisterPage = () => {
  const { isArabic, toggleLanguage } = useContext(AppContext);

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            className={`${isArabic ? "ml-0" : "ml-2"}`}
            checked={isArabic}
            onChange={toggleLanguage}
            name="language-switch"
            color="primary"
            inputProps={{ "aria-label": "language toggle" }}
            sx={{
              "& .MuiSwitch-switchBase": {
                color: "green", // اللون عند الإيقاف
              },
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "green", // اللون عند التشغيل
              },
              "& .MuiSwitch-track": {
                backgroundColor: "blue", // لون المسار عند الإيقاف
              },
              "& .MuiSwitch-track.Mui-checked": {
                backgroundColor: "blue", // لون المسار عند التشغيل
              },
            }}
          />
        }
        label={isArabic ? "AR" : "EN"}
      />
    </div>
  );
};

export default RegisterPage;
