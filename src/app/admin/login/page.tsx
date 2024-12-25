"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { base_url } from "@/utils/domain";
import Cookies from "js-cookie";
import LoadingBTN from "../components/loadingBTN";
import { useLanguage } from "@/app/context/LanguageContext";

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // حالة التحميل
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // تفعيل حالة التحميل
    setError(""); // إعادة تعيين الخطأ
    try {
      const response = await axios.post(`${base_url}/admin/login`, {
        email,
        password,
      });
      Cookies.set("Token", response.data.data.access_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      console.log(err);
    } finally {
      setLoading(false); // إيقاف حالة التحميل
    }
  };

  return (
    <>
      <div className="w-full items-center justify-between flex h-[100vh] bg-secondary1">
        <div className=" hidden md:block md:w-1/2 w-full min-h-screen bg_image"></div>
        <div className="flex flex-col items-center md:w-1/2 w-full justify-center min-h-screen">
          <h1 className="text-3xl mb-4">{t("Login")}</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-[300px] gap-4"
          >
            <input
              type="email"
              placeholder={t("Email") + "..."}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 text-xl w-full border rounded"
              disabled={loading}
            />
            <input
              type="password"
              placeholder={t("Password") + "..."}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 text-xl w-full border rounded"
              disabled={loading}
            />
            <button
              type="submit"
              className={`p-2 bg-primary1 hover:bg-blue-700 text-white rounded flex items-center justify-center`}
              disabled={loading}
            >
              {loading ? <LoadingBTN /> : t("Login")}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
