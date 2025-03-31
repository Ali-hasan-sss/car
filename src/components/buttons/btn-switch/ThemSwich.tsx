"use client";
import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { FormControlLabel, Switch } from "@mui/material";
import { FaMoon, FaSun } from "react-icons/fa";
const RegisterPage = () => {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <div>
      <FormControlLabel
        label={isDarkMode ? <FaMoon /> : <FaSun />}
        control={
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
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
      />
    </div>
  );
};

export default RegisterPage;
