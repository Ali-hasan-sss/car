"use client";
import "./dashboard.css";
import Footer from "./footer";
import Sidebar from "./siedbar";
import Topbar from "./topbar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex flex-col h-screen overflow-y-auto bg-secondary2 p-4">
        <Topbar />
        <div className="wellcome flex flex-col flex-grow px-5 py-4">
          <p>
            Welcome back, <span> Ali</span> !
          </p>
          <div className="main flex-grow w-full bg-white ">{children}</div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
