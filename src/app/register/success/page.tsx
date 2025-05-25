"use client";
import Register_footer from "@/components/footer/Register_footer";
import Register_nav from "@/components/NavBar/register_navbar";
import { useLanguage } from "@/context/LanguageContext";
import { RootState } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function Success() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const Email = useSelector((state: RootState) => state.auth.user?.email);
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
  return (
    <>
      <Register_nav />
      <div className="w-full bg-secondary1 h-[79vh] flex items-center justify-center">
        <div className="w-[350px] bg-white rounded-xl gap-5 py-5 px-4 flex flex-col items-center justify-center">
          <img src="/images/mail-send.png" className="w-20 " alt="" />
          <h2 className="text-xl font-bold">{t("Verify_email")}</h2>
          <p className="text-sm text-gray-500">
            {t("send_email")}:
            <span className="px-1 font-bold text-gray-900">{Email}</span>
          </p>
          <p className="text-sm text-center text-gray-500">
            {t("Check_email")}{" "}
          </p>
          <p className="text-sm ">
            {t("Didnt_receive")}
            <button
              className={`text-blue-600 underline px-1 ${
                loading ? "text-gray-400" : ""
              }`}
              onClick={handleResent}
              disabled={loading}
            >
              {t("Resend_Code")}
            </button>{" "}
          </p>
        </div>
      </div>
      <Register_footer />
    </>
  );
}
