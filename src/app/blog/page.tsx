"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar/navbar";
import Footer from "@/components/footer";
import CoverImage from "@/components/common/cover_image";
import BlogCard from "@/components/cards/blogCard";
import WellCome from "@/components/common/wellcome";
import axiosInstance from "@/utils/axiosInstance";
import { useLanguage } from "@/context/LanguageContext";
import Loader from "@/components/loading/loadingPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchBlogUserSuccess } from "@/store/slice/blogUser";

const BlogPage: React.FC = () => {
  const [loadingPage, setLoadingPage] = useState(false);
  const isArabic = useLanguage();
  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Blogs";
  }, []);
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogsUser.blogList);
  const lastUpdated = useSelector(
    (state: RootState) => state.blogsUser.lastUpdated
  );
  const shouldFetch = () => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return now - lastUpdated > fiveMinutes || blogs.length === 0;
  };

  useEffect(() => {
    document.title = "SOUFAN GLOBAL | Services";
  }, []);

  useEffect(() => {
    if (shouldFetch()) {
      const fetchServices = async () => {
        setLoadingPage(true);
        try {
          const response = await axiosInstance.get("/customer/services");
          dispatch(fetchBlogUserSuccess(response.data.data));
        } catch (error) {
          console.error("فشل جلب الخدمات", error);
        } finally {
          setLoadingPage(false);
        }
      };
      fetchServices();
    }
  }, [isArabic]);
  return (
    <div>
      <Navbar />
      <div className="">
        <div className="flex bg-secondary1 flex-col w-full items-start ">
          <CoverImage label="Blogs" />
          <WellCome
            title={isArabic ? "المقالات" : "Soufan Global blogs"}
            titleDes=""
            information={
              isArabic
                ? "آخر أخبار السيارات ومزاداتها"
                : "Latest Car News and Auctions"
            }
          />
          {loadingPage ? (
            <Loader />
          ) : (
            <div className="px-[10px] md:px-[50px] py-[50px] flex flex-wrap gap-20 w-full  justify-center ">
              {blogs.map((blog, index) => (
                <BlogCard
                  key={index}
                  id={blog.id}
                  image={blog.image}
                  title={blog.title}
                  body={blog.body}
                  description={blog.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
