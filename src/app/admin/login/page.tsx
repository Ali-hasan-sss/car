"use client";
import "../../login/login.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { setLogin } from "@/store/slice/authSlice"; // استيراد الأكشن المعدل
import LoadingBTN from "../../../components/loading/loadingBTN";
import { useLanguage } from "@/app/context/LanguageContext";
import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new URLSearchParams();
      data.append("email", email);
      data.append("password", password);

      const response = await axiosInstance.post(`/admin/login`, data);
      const {
        access_token,
        id,
        email: userEmail,
        first_name,
        last_name,
        is_active,
      } = response.data.data;

      const userData = {
        id,
        email: userEmail,
        firstName: first_name,
        lastName: last_name,
        is_active,
        userRole: "ADMIN",
      };

      // ✅ تخزين التوكن والمستخدم في Redux
      const userDataTransformed = {
        id: userData.id,
        email: userData.email,
        first_name: userData.firstName, // تحويل الحقول هنا
        last_name: userData.lastName, // تحويل الحقول هنا
        is_active: userData.is_active,
        userRole: userData.userRole,
      };

      dispatch(setLogin({ token: access_token, user: userDataTransformed }));

      // ✅ تحويل المستخدم إلى صفحة لوحة التحكم
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full items-center justify-between flex h-[100vh] bg-secondary1">
      <div className="hidden md:block md:w-1/2 w-full min-h-screen bg_image"></div>
      <div className="flex flex-col items-center md:w-1/2 w-full justify-center min-h-screen">
        <h1 className="text-3xl mb-4">{t("Login")}</h1>
        <form onSubmit={handleLogin} className="flex  flex-col w-[300px] gap-4">
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
          <button
            type="submit"
            className="p-2 button_outline flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <LoadingBTN /> : t("Login")}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
