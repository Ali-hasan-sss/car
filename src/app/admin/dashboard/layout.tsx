"use client";
import { Provider } from "react-redux";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/adminComponents/Sidebar";
import AdminNavbar from "../../../components/adminComponents/navbar";
import AuthGuard from "../AuthGuard";
import store from "@/store/store";

const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Admin dashboard";
  }, []);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Provider store={store}>
      <AuthGuard>
        <div className="flex flex-col h-screen bg-white">
          {/* Navbar */}
          <div className="flex-shrink-0">
            <AdminNavbar />
          </div>

          {/* Main Layout: Sidebar + Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="h-full overflow-y-auto custom-scrollbar">
              <Sidebar isExpanded={isExpanded} onToggle={handleToggle} />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-2 bg-gray-50">
              {children}
            </div>
          </div>
        </div>
      </AuthGuard>
    </Provider>
  );
};

export default AdminDashboardLayout;
