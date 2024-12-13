import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// استيراد الأنماط الأساسية لـ Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider: React.FC = () => {
  const images = [
    { src: "/images/slider1.jpg", alt: "Image 1" },
    { src: "/images/slider2.jpg", alt: "Image 2" },
    { src: "/images/slider3.jpg", alt: "Image 3" },
  ];

  // مراجع الأزرار المخصصة
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative w-1/2 h-[500px]">
      {/* أزرار الأسهم المخصصة */}
      <div
        ref={prevRef}
        className="absolute left-1/3 ml-[45px] bottom-10 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowLeft size={24} />
      </div>
      <div
        ref={nextRef}
        className="absolute right-1/3 mr-[45px] bottom-10 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowRight size={24} />
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current, // ربط الزر السابق
          nextEl: nextRef.current, // ربط الزر التالي
        }}
        onBeforeInit={(swiper) => {
          // التحقق من أن `params.navigation` ليست undefined
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        loop
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
