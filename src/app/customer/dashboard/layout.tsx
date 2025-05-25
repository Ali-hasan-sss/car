"use client";
import "./dashboard.css";
import Footer from "../../../components/DashboardComponernt/customer/footer";
import Sidebar from "../../../components/DashboardComponernt/customer/siedbar";
import Topbar from "../../../components/DashboardComponernt/customer/topbar";
import AuthGuard from "@/app/admin/AuthGuard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loader from "@/components/loading/loadingPage";
import { useLanguage } from "@/context/LanguageContext";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isArabic } = useLanguage();
  const [isExpand, setIsExpand] = useState(true);
  const isFullData = useSelector(
    (state: RootState) => state.auth.user?.is_full_data
  );
  const IsVerified = useSelector(
    (state: RootState) => state.auth.user?.IsVerified
  );

  const Email = useSelector((state: RootState) => state.auth.user?.email);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | dashboard ";
  }, []);
  useEffect(() => {
    if (!isFullData) window.location.replace("/register/complete");
  }, []);
  const handleResent = async () => {
    try {
      setLoading(true);
      const data = { email: Email };
      if (data) {
        await axiosInstance.post("/email/verify/resend", data);
        toast.success("resent success");
      } else toast.error("dont find email");
    } catch (err) {
      console.error(err);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };
  if (!IsVerified)
    return (
      <div className="w-full h-screen fixed bg-red-50 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md w-full">
          <h2 className="text-lg md:text-2xl font-semibold text-red-600 mb-4">
            {isArabic
              ? "لم يتم التحقق من بريدك الإلكتروني"
              : "Your email has not been verified"}
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            {isArabic
              ? "تحقق من البريد الوارد واضغط على رابط تفعيل الحساب."
              : "Check your inbox and click on the account activation link."}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            {isArabic ? "لم يصلك البريد؟" : "Didn't receive the email?"}
            <button
              onClick={handleResent}
              disabled={loading}
              className={`ml-1 text-blue-600 underline hover:text-blue-800 ${
                loading && "text-gray-400 hover:text-gray-400"
              } `}
            >
              {isArabic
                ? "إعادة إرسال بريد التحقق"
                : "Resend verification email"}
            </button>
          </p>
          <button
            className="button_outline mt-4 px-4 py-2 transition"
            onClick={() => window.location.replace("/")}
          >
            {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
          </button>
        </div>
      </div>
    );
  return !isFullData ? (
    <Loader />
  ) : (
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
