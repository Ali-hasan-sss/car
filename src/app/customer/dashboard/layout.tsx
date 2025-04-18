"use client";
import "./dashboard.css";
import Footer from "../../../components/DashboardComponernt/footer";
import Sidebar from "../../../components/DashboardComponernt/siedbar";
import Topbar from "../../../components/DashboardComponernt/topbar";
import AuthGuard from "@/app/admin/AuthGuard";
import { useState } from "react";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <div className="flex ">
      <AuthGuard>
        <Sidebar
          setisExpand={(val) => {
            setIsExpand(val);
            console.log(val);
          }}
        />
        <main className="w-full flex flex-col h-screen overflow-y-auto bg-secondary1 pb-[50px] md:pb-0 py-3 px-2">
          <Topbar isExpand={isExpand} />
          <div className="wellcome w-full flex flex-col flex-grow py-3">
            {children}
          </div>
          <Footer />
        </main>
      </AuthGuard>
    </div>
  );
};

export default DashboardLayout;
