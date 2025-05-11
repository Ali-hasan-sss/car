"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
//import { useLanguage } from "@/context/LanguageContext";
import Loader from "@/components/loading/loadingPage";

interface Blog {
  id: number;
  title: string;
  description: string;
  body: string;
  slug: string;
  image: string;
  images: string[];
  created_at: string;
  updated_at: string;
}
export default function Blog() {
  const [blog, setBlog] = useState<Blog | null>(null);

  const [loadingPage, setLoadingPage] = useState(false);
  // const { t } = useLanguage();
  const [id, setId] = useState(0);
  useEffect(() => {
    const storedid = localStorage.getItem("itemselected");
    if (storedid) {
      setId(Number(storedid));
    }
  }, []);

  useEffect(() => {
    if (!id && id !== 0) return;

    const fetchBlog = async () => {
      try {
        setLoadingPage(true);
        const response = await axiosInstance.get(`/customer/bloge/${id}`);
        setBlog(response.data.data);
      } catch (error) {
        console.error("فشل جلب المقال", error);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <>
      {loadingPage ? (
        <div className="w-full flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col py-[40px] w-full items-center justify-center">
          <div className="w-[500px] overflow-hidden h-[300px] flex items-center justify-center">
            {blog?.image ? (
              <img src={blog.image} className="w-full object-cover" />
            ) : (
              <p>لا توجد صورة</p>
            )}
          </div>

          <div className="container flex items-start justify-between gap-[30px] py-[20px]">
            {!blog ? (
              <p>جاري تحميل المقال...</p>
            ) : (
              <div className="w-full flex flex-col gap-2 border rounded p-2 bg-secondary1">
                <h1 className="text-text_title font-bold text-xl">
                  {blog.title}
                </h1>
                <hr />
                <h2 className="text-text_des text-lg">{blog.description}</h2>
                <hr />
                <p className="text-lg">{blog.body}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
