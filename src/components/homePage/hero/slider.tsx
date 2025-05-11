import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// استيراد الأنماط الأساسية لـ Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider: React.FC = () => {
  const images = [
    { src: "/images/slider1.jpg", alt: "Image 1" },
    { src: "/images/slider2.jpeg", alt: "Image 2" },
    { src: "/images/slider3.jpeg", alt: "Image 3" },
  ];

  // مراجع الأزرار المخصصة
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative w-full h-[500px]">
      {/* زر السهم السابق */}
      <div
        ref={prevRef}
        className="absolute bottom-10 left-10 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowLeft size={24} />
      </div>

      {/* زر السهم التالي */}
      <div
        ref={nextRef}
        className="absolute bottom-10 right-10 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowRight size={24} />
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
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
              <img
                src={image.src}
                alt={image.alt}
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
    </div>
  );
};

export default Slider;
