"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { fetchBlogsSuccess } from "@/store/Reducers/blogsReducer";
import type { Blog } from "@/Types/adminTypes";

export default function Blog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null); // ✅ السماح بأن يكون null في البداية

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/admin/blogs/${id}`);
        setBlog(response.data.data); // ✅ تخزين البيانات بعد الجلب
        dispatch(fetchBlogsSuccess(response.data.data));
      } catch (error) {
        console.error("فشل جلب المقال", error);
      }
    };

    fetchBlog();
  }, [id, dispatch]);

  return (
    <>
      <div className="flex flex-col py-[40px] w-full items-center justify-center">
        <div className="w-[500px] overflow-hidden h-[300px] flex items-center justify-center">
          <img
            src={blog?.image}
            alt={blog?.title.en}
            className="w-full object-cover"
          />
        </div>
        <div className="container flex items-start justify-between gap-[30px] py-[20px]">
          {!blog ? ( // ✅ عرض رسالة تحميل إذا لم يتم جلب البيانات بعد
            <p>جاري تحميل المقال...</p>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-1/2 ">
                <label className="text-text_dis">المقالة بالعربي</label>
                <div className="w-full flex flex-col gap-2 border rounded p-2 bg-secondary1">
                  <h1 className="text-text_title  font-bold text-xl">
                    {blog?.title?.ar || "لا يوجد عنوان"}
                  </h1>
                  <hr></hr>
                  <h2 className=" text-text_des text-lg">
                    {blog?.description?.ar || "لا يوجد وصف"}
                  </h2>
                  <hr></hr>
                  <h2 className="text-lg">
                    {blog?.body?.ar || "لا يوجد محتوى"}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-1/2">
                <label className="text-text_dis">المقالة بالإنجليزية</label>
                <div className="w-full flex flex-col gap-2 border rounded p-2 bg-secondary1">
                  <h1 className="text-text_title  font-bold text-xl">
                    {blog?.title?.en || "No Title"}
                  </h1>
                  <hr></hr>
                  <h2 className="text-text_des text-lg">
                    {blog?.description?.en || "No Description"}
                  </h2>
                  <hr></hr>
                  <h2 className="text-text_title">
                    {blog?.body?.en || "No Content"}
                  </h2>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
