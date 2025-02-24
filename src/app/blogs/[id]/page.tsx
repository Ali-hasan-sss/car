"use client";

import { fetchBlogsSuccess } from "@/store/Reducers/blogsReducer";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation"; // ✅ استيراد useParams

export default function Blog() {
  const dispatch = useDispatch();
  const { id } = useParams(); // ✅ جلب المعرف من الرابط

  useEffect(() => {
    if (!id) return; // ✅ منع التنفيذ إذا لم يكن هناك ID

    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/admin/blogs/${id}`);
        dispatch(fetchBlogsSuccess(response.data.data));
      } catch (error) {
        console.error("فشل جلب المقال", error);
      }
    };

    fetchBlog();
  }, [id, dispatch]); // ✅ إضافة id إلى التبعيات

  return <div>عرض المقال هنا</div>;
}
