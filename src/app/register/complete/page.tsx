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

const Registration: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData = useSelector((state: any) => state.auth.user);
  const is_full_data = useSelector(
    (state: RootState) => state.auth.user?.is_full_data
  );
  const dispatch = useDispatch();
  // Initialize form data with correct types
  const [formData, setFormData] = useState<{
    email: string;
    type: string;
    name: string;
    user_id: string;
    mobile: string;
    other_mobile: string;
    country_id: number | null; // Ensure this field supports both number and null
    language: string;
    address1: string;
    address2: string;
    city: string;
    zip_code: string;
    id_number: string;
    id_file: string;
    passport_file: string;
    tax_info: string;
    cr_certificate: string;
  }>({
    email: "",
    type: "",
    name: "",
    user_id: "",
    mobile: "",
    other_mobile: "",
    country_id: null, // Default value is null
    language: "",
    address1: "",
    address2: "",
    city: "",
    zip_code: "",
    id_number: "",
    id_file: "",
    passport_file: "",
    tax_info: "",
    cr_certificate: "",
  });
  useEffect(() => {
    if (is_full_data) {
      router.push("/customer/dashboard"); // إعادة توجيه المستخدم إلى لوحة التحكم
    }
  }, [router]);
  // Function to initialize form data with only the required fields
  useEffect(() => {
    const initializeFormData = () => {
      const initialData = {
        email: userData?.email || "",
        type: userData?.type || "",
        name: `${userData?.first_name || ""} ${
          userData?.last_name || ""
        }`.trim(),
        user_id: userData?.id || "",
        mobile: userData?.mobile || "",
        other_mobile: userData?.other_mobile || "",
        country_id: userData?.country_id || 0,
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
      };
      setFormData(initialData);
    };

    if (userData) {
      initializeFormData();
    }
  }, [userData]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("customer/profile", formData);
      const { id, name, type, email, is_full_data, contact, idDetail } =
        response.data.data;

      // تقسيم الاسم إلى اسم أول واسم ثاني
      const [first_name, last_name] = name.split(" ");
      const userData = {
        id,
        email,
        first_name: first_name || "",
        last_name: last_name || "",
        userRole: type === 1 ? "USER" : "COMPANY",
        type, // نوع المستخدم (1 أو 2)
        is_full_data: is_full_data === 1,
        contact: contact || null,
        idDetail: idDetail || null,
      };
      dispatch(setUser(userData));
      router.push("/customer/dashboard");
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
        initialData={userData}
        onSubmit={handleSubmit}
        skip={true}
        loading={loading}
      />
      <Register_footer />
    </Box>
  );
};

export default Registration;
