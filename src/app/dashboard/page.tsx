"use client";

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { isDarkMode, isArabic } = useContext(AppContext);

  return (
    <div className="flex">
      <main
        className={` flex-1 p-4 ${isDarkMode ? "dark-bg-2 " : "light-bg-2 "}`}
      >
        {!isArabic ? "Home" : "الرئيسية"}
      </main>
    </div>
  );
};

export default Dashboard;
