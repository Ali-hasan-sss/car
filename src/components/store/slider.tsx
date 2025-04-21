import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "./card";
import { useRef, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import Loader from "../loading/loadingPage";
import { useLanguage } from "@/context/LanguageContext";

interface CarResponse {
  id: number;
  user: {
    contact: {
      city: string;
    };
  };
  category: {
    title: string;
    manufacturer: {
      title: string;
    };
  };
  cmodel: {
    title: string;
  };
  year: number;
  price: number;
  images: {
    image: string;
  }[];
}

export default function Slider_card() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [cars, setCars] = useState<CarResponse[]>([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const Router = useRouter();
  const { t } = useLanguage();
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingPage(true);
      try {
        const response = await axiosInstance.get("/car-sales-all");
        setCars(response.data.data);
      } catch (error) {
        console.error("فشل جلب الخدمات", error);
      } finally {
        setLoadingPage(false);
      }
    };
    fetchServices();
  }, []);
  useEffect(() => {
    // تحديث swiper عند تهيئة المراجع
    const updateSwiperNavigation = () => {
      const prevButton = prevRef.current;
      const nextButton = nextRef.current;

      if (prevButton && nextButton) {
        prevButton.style.cursor = "pointer";
        nextButton.style.cursor = "pointer";
      }
    };

    updateSwiperNavigation();
  }, [prevRef, nextRef]);
  const goToStore = () => {
    Router.push("/car-store");
  };
  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={1}
        slidesPerView={4}
        breakpoints={{
          1200: { slidesPerView: 5, spaceBetween: 3 },
          1024: { slidesPerView: 4, spaceBetween: 3 },
          768: { slidesPerView: 3, spaceBetween: 2 },
          400: { slidesPerView: 2, spaceBetween: 2 },
          0: { slidesPerView: 1.5, spaceBetween: 2 },
        }}
        navigation={{
          prevEl: prevRef.current, // الربط باستخدام refs
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
        freeMode={true}
        style={{
          height: "350px",
          padding: "10px",
        }}
      >
        {loadingPage ? (
          <Loader />
        ) : (
          cars.map((car, index) => (
            <SwiperSlide key={index}>
              <Card car={car} />
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <div className="slider-controls flex justify-between items-center mt-1">
        <div className="flex item-center justify-center gap-1">
          {cars.map((_, index) => (
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
        <button onClick={goToStore} className="button_outline px-4 py-1 mt-3">
          {t("View_More")}
        </button>
        <div className="slider-navigation flex items-center gap-2">
          <div className="arrow-button flex item-center justify-center gap-1 ">
            <div
              ref={prevRef}
              className="arrow-btn flex item-center justify-center p-[12px] cursor-pointer"
            >
              <img src="/images/left.png" className="w-[10px]" alt="arrow" />
            </div>
            <div
              ref={nextRef}
              className="arrow-btn flex item-center justify-center p-[12px] cursor-pointer"
            >
              <img src="/images/right.png" className="w-[10px]" alt="arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
