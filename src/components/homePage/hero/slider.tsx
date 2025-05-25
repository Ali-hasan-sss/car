"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// استيراد الأنماط الأساسية لـ Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Edit, Save } from "lucide-react";
import ImageUploader from "@/components/uploders/Uploader/ImageUploader";
import axiosInstance from "@/utils/axiosInstance";
import { updateBlog } from "@/store/Reducers/blogsReducer";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import LoadingBTN from "@/components/loading/loadingBTN";
import { setHeroImages } from "@/store/slice/heroSlice";

const Slider: React.FC = () => {
  const images = useSelector((state: RootState) => state.hero.images);
  const heroInfo = useSelector((state: RootState) => state.blogs.selectedBlog);
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  const isDashboard = window.location.pathname.includes("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [initImages, setInitImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null); // لحفظ مرجع الـ Swiper
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        swiperRef.current &&
        swiperRef.current.params &&
        swiperRef.current.navigation &&
        typeof swiperRef.current.params.navigation !== "boolean"
      ) {
        swiperRef.current.params.navigation.prevEl = prevRef.current;
        swiperRef.current.params.navigation.nextEl = nextRef.current;

        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();

        if (swiperRef.current.pagination) {
          swiperRef.current.pagination.init();
          swiperRef.current.pagination.update();
        }
      }
    }, 100); // تأخير بسيط لضمان تحميل DOM

    return () => clearTimeout(timer);
  }, [isEditing]); // يعاد تفعيله فقط عند تغيير وضع التحرير

  //init emages uploaders
  useEffect(() => {
    if (images && Array.isArray(images)) {
      const imageNames = images.map(
        (img: string) => img.split("/").pop() ?? ""
      );
      setUploadedImages(imageNames);
      setInitImages(imageNames);
    }
  }, [images]);
  //send Emage to Api
  const handleSave = async () => {
    if (!heroInfo) return;
    try {
      setLoading(true);
      const { title, description, body, ...rest } = heroInfo;

      const updatedPayload = {
        ...rest,
        title: JSON.stringify(title),
        description: JSON.stringify(description),
        body: JSON.stringify(body),
        images: uploadedImages,
      };

      const response = await axiosInstance.put(
        "/admin/blogs/31",
        updatedPayload
      );

      if (response.data.success) {
        const updatedBlog = {
          ...response.data.data,
          images: uploadedImages,
          image: uploadedImages[0],
        };
        dispatch(updateBlog(updatedBlog));
        const resimage = response.data.data.images;
        const imageUrls = resimage.map((img: { image: string }) => img.image);
        dispatch(setHeroImages(imageUrls));
        toast.success(t("Edit_Item"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      console.log("uploaded:", uploadedImages);
      setIsEditing(false);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[500px]">
      {!isEditing && (
        <div
          ref={prevRef}
          className="absolute bottom-10 left-10 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <FaArrowLeft size={24} />
        </div>
      )}
      {!isEditing && (
        <div
          ref={nextRef}
          className="absolute bottom-10 right-10 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <FaArrowRight size={24} />
        </div>
      )}
      {isDashboard && userRole === "ADMIN" && (
        <>
          <button
            className="bg-yellow-300 flex items-center justify-center hover:bg-yellow-400 w-10 h-10 absolute z-10 top-4 left-4 rounded-full p-1"
            role="button"
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
          >
            {isEditing ? loading ? <LoadingBTN /> : <Save /> : <Edit />}
          </button>
          {isEditing && (
            <button
              className="bg-red-700 text-white flex items-center justify-center hover:bg-red-600 w-10 h-10 absolute z-10 top-4 right-4 rounded-full p-1"
              role="button"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              X
            </button>
          )}
        </>
      )}
      {/* Swiper */}
      {isEditing ? (
        <div className="absoliut top-3 left-3 rounded-full p-1">
          <ImageUploader
            multiple
            initialImages={initImages}
            onImagesUpload={(images) => setUploadedImages(images)}
          />
        </div>
      ) : (
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loop
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt={`slide-${index}`}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Slider;
