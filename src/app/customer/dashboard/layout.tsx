"use client";
import "./dashboard.css";
import Footer from "../../../components/DashboardComponernt/footer";
import Sidebar from "../../../components/DashboardComponernt/siedbar";
import Topbar from "../../../components/DashboardComponernt/topbar";
import AuthGuard from "@/app/admin/AuthGuard";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex ">
      <AuthGuard>
        <Sidebar />
        <main className="w-full flex flex-col h-screen overflow-y-auto bg-secondary1 pb-[50px] md:pb-0 p-4">
          <Topbar />
          <div className="wellcome w-full flex flex-col flex-grow px-5 py-4">
            {children}
          </div>
          <Footer />
        </main>
      </AuthGuard>
    </div>
  );
};

export default DashboardLayout;
