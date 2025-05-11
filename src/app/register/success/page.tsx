"use client";
import Register_footer from "@/components/footer/Register_footer";
import Register_nav from "@/components/NavBar/register_navbar";
import { RootState } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function Success() {
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
          <h2 className="text-xl font-bold">Verify Your Email Address</h2>
          <p className="text-sm text-gray-500">
            We have sent a confirmation email to your email address:
            <span className="px-1 font-bold text-gray-900">{Email}</span>
          </p>
          <p className="text-sm text-center text-gray-500">
            Check your email and click on the confirmation link to continue.{" "}
          </p>
          <p className="text-sm ">
            Didn&apos;t receive the email?
            <button
              className={`text-blue-600 underline px-1 ${
                loading ? "text-gray-400" : ""
              }`}
              onClick={handleResent}
              disabled={loading}
            >
              Resend Code
            </button>{" "}
          </p>
        </div>
      </div>
      <Register_footer />
    </>
  );
}
