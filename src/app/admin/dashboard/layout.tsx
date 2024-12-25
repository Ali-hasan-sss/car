"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/navbar";
import AuthGuard from "../AuthGuard";

const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AuthGuard>
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <div className="flex-shrink-0">
          <AdminNavbar />
        </div>
        <div className="flex">
          {/* Sidebar */}
          <div className="flex">
            <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminDashboardLayout;
