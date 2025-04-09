"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import Register_nav from "@/components/header/register_navbar";
import Register_footer from "@/components/footer/Register_footer";

import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";
import UserForm from "@/components/adminComponents/forms/UserForm";
import { initialData } from "@/Types/adminTypes";
import { toast } from "sonner";

const Registration: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData = useSelector((state: any) => state.auth.user);
  const is_full_data = useSelector(
    (state: RootState) => state.auth.user?.is_full_data
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateInitialData = (userData: any) => ({
    email: userData?.email || "",
    type: Number(userData?.type) || 0,
    name: `${userData?.first_name || ""} ${userData?.last_name || ""}`.trim(),
    user_id: userData?.id || "",
    mobile: userData?.mobile || "",
    other_mobile: userData?.other_mobile || "",
    country_id: userData?.country_id || null,
    language: userData?.language || "",
    address1: userData?.address1 || "",
    address2: userData?.address2 || "",
    city: userData?.city || "",
    zip_code: userData?.zip_code || "",
    id_number: userData?.id_number || "",
    id_file: userData?.id_file || "",
    passport_file: userData?.passport_file || "",
    tax_info: userData?.tax_info || "",
    cr_certificate: userData?.cr_certificate || "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (is_full_data) {
      router.push("/customer/dashboard"); // إعادة توجيه المستخدم إلى لوحة التحكم
    }
  }, [router]);

  const handleSubmit = async (formData: initialData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("customer/profile", formData);

      // تحقق من نجاح العملية
      if (response.status === 200 && response.data?.data) {
        const { id, name, type, email, is_full_data, contact, idDetail } =
          response.data.data;

        // تقسيم الاسم
        const [first_name, last_name] = name.split(" ");
        const userData = {
          id,
          email,
          first_name: first_name || "",
          last_name: last_name || "",
          userRole: type === 1 ? "USER" : "COMPANY",
          type,
          is_full_data: is_full_data === 1,
          contact: contact || null,
          idDetail: idDetail || null,
        };

        dispatch(setUser(userData));
        toast.success("تم اكمال البيانات بنجاح");
        router.push("/customer/dashboard");
      } else {
        console.error("فشل في استجابة السيرفر:", response);
        toast.error("حدث خطا اثناء اكمال البيانات الرجاء المحاولة لاحقا");
        alert("لم تتم عملية التسجيل بنجاح، حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("خطأ أثناء التسجيل:", error);
      alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Register_nav />

      <UserForm
        initialData={generateInitialData(userData)}
        onSubmit={handleSubmit}
        skip={true}
        loading={loading}
      />

      <Register_footer />
    </Box>
  );
};

export default Registration;
