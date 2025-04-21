import { useLanguage } from "@/context/LanguageContext";
import Slider_card from "./slider";

export default function Reviwe() {
  const { isArabic } = useLanguage();
  return (
    <div className="w-full px-[10px] md:px-[64px] py-[10px] md:py-[50px] bg-white ">
      <div className="w-full ">
        <div className="title">
          <h1 className="text-3xl font-bold text-center">
            {isArabic ? "آراء عملائنا" : "What Our Customers Say"}
          </h1>
          <p className="text-lg text-gray-500 text-center mt-4">
            {isArabic
              ? "موثوق به من قبل آلاف العملاء السعداء حول العالم."
              : "Trusted by thousands of happy customers worldwide."}
          </p>
        </div>
      </div>
      <Slider_card />
    </div>
  );
}
