import { useLanguage } from "@/context/LanguageContext";
import Card from "./card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchBlogUserSuccess } from "@/store/slice/blogUser";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/loading/loadingPage";

export default function Section4() {
  const { isArabic } = useLanguage();
  const [loadingPage, setLoadingPage] = useState(false);

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
    <div className="w-full px-2 md:px-10 ">
      <div className="py-[30px] flex flex-col items-center justify-center gap-8">
        <div className="flex max-h-[500px] flex-col items-center justify-center gap-4">
          <h1 className="text-xl md:text-3xl font-bold">
            News from Soufan Global
          </h1>
          <p className="text-text_des text-sm md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        {loadingPage ? (
          <Loader />
        ) : (
          <div className="flex w-full flex-wrap gap-6 items-center justify-center md:justify-between">
            {blogs.slice(-3).map((plog, index) => (
              <Card key={index} post={plog} />
            ))}
          </div>
        )}
        <a href="/blog" className=" button_outline rounded-lg  py-1 px-4">
          View all
        </a>
      </div>
    </div>
  );
}
