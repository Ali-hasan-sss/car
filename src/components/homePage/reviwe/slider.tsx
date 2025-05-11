import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Card from "./card";
import { reviwes } from "./data";
import { useRef } from "react";
// المكون الرئيسي
export default function Slider_card() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="slider-container">
      <Swiper
        spaceBetween={20} // المسافة بين البطاقات
        slidesPerView={3} // عدد البطاقات الافتراضي
        breakpoints={{
          1200: { slidesPerView: 3, spaceBetween: 3 }, // شاشات كبيرة جدًا
          1024: { slidesPerView: 3, spaceBetween: 3 }, // شاشات كبيرة
          768: { slidesPerView: 2, spaceBetween: 2 }, // شاشات متوسطة
          400: { slidesPerView: 1, spaceBetween: 2 }, // شاشات صغيرة
          0: { slidesPerView: 1, spaceBetween: 1 }, // شاشات صغيرة جدًا
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
          height: "350px", // ارتفاع السلايدر
          padding: "10px", // البادينغ داخل السلايدر
        }}
      >
        {reviwes.map((reviwe) => (
          <SwiperSlide key={reviwe.id}>
            <Card {...reviwe} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* عناصر التحكم أسفل السلايدر */}
      <div className="slider-controls flex justify-between items-center ">
        {/* النقاط تشير إلى عدد العناصر */}
        <div className="flex item-center justify-center gap-1">
          {reviwes.map((_, index) => (
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
