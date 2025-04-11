"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import CoverImage from "@/components/Hero_general/cover_image";
import BlogCard from "@/components/cards/blogCard";
import WellCome from "@/components/Hello_section/wellcome";
import axiosInstance from "@/utils/axiosInstance";
import { useLanguage } from "@/context/LanguageContext";
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
const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const isArabic = useLanguage();
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingPage(true);
      try {
        const response = await axiosInstance.get("/customer/blogs");
        setBlogs(response.data.data);
      } catch (error) {
        console.error("فشل جلب الخدمات", error);
      } finally {
        setLoadingPage(false);
      }
    };
    fetchServices();
  }, [isArabic]);
  return (
    <div>
      <Navbar />
      <div className="">
        <div className="flex bg-secondary1 flex-col items-center justify-center ">
          <CoverImage label="Blogs" />
          <WellCome
            title="Soufan Global blogs"
            titleDes=""
            information="WellCome to Soufan Global blogs"
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
