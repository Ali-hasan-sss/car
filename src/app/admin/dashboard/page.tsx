"use client";

import React from "react";
import AuthGuard from "../AuthGuard";

const AdminDashboard: React.FC = () => {
  return (
    <AuthGuard>
      <div className="dashboardPage">
        <h1 className="text-center p-4 text-xl">Admin Dashboard</h1>
        {/* محتوى لوحة التحكم */}
      </div>
    </AuthGuard>
  );
};

export default AdminDashboard;
