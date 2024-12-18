import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useRef } from "react";
import { images } from "./data";
import Image from "next/image";
// المكون الرئيسي
export default function Slider_image() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="slider-container">
      <Swiper
        spaceBetween={1} // المسافة بين البطاقات
        slidesPerView={4} // عدد البطاقات الافتراضي
        breakpoints={{
          1200: { slidesPerView: 5, spaceBetween: 5 }, // شاشات كبيرة جدًا
          1024: { slidesPerView: 4, spaceBetween: 5 }, // شاشات كبيرة
          768: { slidesPerView: 3, spaceBetween: 4 }, // شاشات متوسطة
          400: { slidesPerView: 2, spaceBetween: 4 }, // شاشات صغيرة
          0: { slidesPerView: 1, spaceBetween: 3 }, // شاشات صغيرة جدًا
        }}
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
        freeMode={true} // سكرول حر
        style={{
          height: "200px", // ارتفاع السلايدر
          padding: "10px", // البادينغ داخل السلايدر
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-[200px] h-[200px] "
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* عناصر التحكم أسفل السلايدر */}
      <div className="slider-controls flex justify-between items-center mt-2">
        {/* النقاط تشير إلى عدد العناصر */}
        <div className="flex item-center justify-center gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className="dot flex item-center justify-center gap-1"
            >
              <img
                src="/images/Dot.png"
                alt="dot"
                className=""
                style={{
                  height: "7px",
                  width: "auto",
                  cursor: "pointer",
                }}
              />
            </div>
          ))}
        </div>
        <button className="btn-view-more">View More</button>
        <div className="slider-navigation flex items-center gap-2">
          <div className="arrow-button flex item-center justify-center gap-1 ">
            <div
              ref={prevRef}
              className="arrow-btn  flex item-center justify-center p-[12px] "
            >
              <img src="/images/left.png" className="w-[10px] " alt="arrow" />
            </div>
            <div
              ref={nextRef}
              className="arrow-btn  flex item-center justify-center p-[12px]"
            >
              <img src="/images/right.png" className="w-[10px] " alt="arrow" />
            </div>
          </div>
          <div className="slider-dots"></div>
        </div>
      </div>
    </div>
  );
}
