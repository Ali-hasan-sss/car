"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar/navbar";
import Footer from "@/components/footer";
import axiosInstance from "@/utils/axiosInstance";
import { useLanguage } from "@/context/LanguageContext";
import Loader from "@/components/loading/loadingPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchBlogUserSuccess } from "@/store/slice/blogUser";
import PostCard from "@/components/cards/postCard";

const BlogPage: React.FC = () => {
  const [loadingPage, setLoadingPage] = useState(false);
  const { isArabic, t } = useLanguage();
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Blogs";
  }, []);
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogsUser.blogList);
  const lastUpdated = useSelector(
    (state: RootState) => state.blogsUser.lastUpdated
  );
  const [lastLang, setLastLang] = useState(isArabic);
  const shouldFetch = () => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return (
      now - lastUpdated > fiveMinutes ||
      blogs.length === 0 ||
      isArabic !== lastLang
    );
  };

  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Services";
  }, []);

  useEffect(() => {
    if (shouldFetch()) {
      const fetchblogs = async () => {
        setLoadingPage(true);
        try {
          const response = await axiosInstance.get("/customer/blogs");
          dispatch(fetchBlogUserSuccess(response.data.data));
          setLastLang(isArabic);
        } catch (error) {
          console.error("فشل جلب الخدمات", error);
        } finally {
          setLoadingPage(false);
        }
      };
      fetchblogs();
    }
  }, [isArabic]);

  return (
    <div>
      <Navbar />
      <section className="bg-white w-full ">
        <div className=" px-1 md:px-10 py-10 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
              {t("Blogs")}
            </h1>
          </div>

          <hr className="my-8 border-gray-200" />

          {loadingPage ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {blogs
                .filter((post) => post.id !== 31)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
