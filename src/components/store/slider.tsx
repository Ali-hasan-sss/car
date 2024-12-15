import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Card from "./card";
// المكون الرئيسي
export default function Slider_card() {
  const carData = [
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
    {
      brandLogo: "/images/KIA_logo.png",
      brandName: "Kia",
      carImage: "/images/optima.png",
      carModel: "kia Optima 2022",
      lotNumber: "20148759950",
      currentBid: "3000",
      location: "Oman",
    },
  ]; // بيانات البطاقات (يمكنك تعديلها حسب الحاجة)

  return (
    <div className="slider-container">
      <Swiper
        spaceBetween={1} // المسافة بين البطاقات
        slidesPerView={4} // عدد البطاقات الافتراضي
        breakpoints={{
          1200: { slidesPerView: 5, spaceBetween: 3 }, // شاشات كبيرة جدًا
          1024: { slidesPerView: 4, spaceBetween: 3 }, // شاشات كبيرة
          768: { slidesPerView: 3, spaceBetween: 2 }, // شاشات متوسطة
          400: { slidesPerView: 2, spaceBetween: 2 }, // شاشات صغيرة
          0: { slidesPerView: 1, spaceBetween: 1 }, // شاشات صغيرة جدًا
        }}
        freeMode={true} // سكرول حر
        style={{
          height: "350px", // ارتفاع السلايدر
          padding: "10px", // البادينغ داخل السلايدر
        }}
      >
        {carData.map((car, index) => (
          <SwiperSlide key={index}>
            <Card {...car} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* عناصر التحكم أسفل السلايدر */}
      <div className="slider-controls flex justify-between items-center mt-2">
        <button className="btn-view-more">View More</button>
        <div className="slider-navigation flex items-center gap-2">
          <button className="arrow-button">←</button>
          <button className="arrow-button">→</button>
          <div className="slider-dots">
            {/* النقاط تشير إلى عدد العناصر */}
            {carData.map((_, index) => (
              <span key={index} className="dot"></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
