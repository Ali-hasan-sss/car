"use client";
import { Provider } from "react-redux";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/navbar";
import AuthGuard from "../AuthGuard";
import store from "@/store/store";

const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Provider store={store}>
      <AuthGuard>
        <div className="flex flex-col bg-white">
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
            <div
              className="flex-1  max-h-screen overflow-y-auto p-2"
              style={{ height: "87vh" }}
            >
              {children}
            </div>
          </div>
        </div>
      </AuthGuard>
    </Provider>
  );
};

export default AdminDashboardLayout;
