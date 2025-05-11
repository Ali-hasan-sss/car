import { useLanguage } from "@/context/LanguageContext";
import Slider_image from "./slider";

export default function Gallery() {
  const { isArabic } = useLanguage();
  return (
    <div className="w-full px-[10px] md:px-[64px] py-10 md:py-[50px] bg-secondary1 ">
      <div className="w-full ">
        <div className="title  ">
          <h1 className="text-center text-3xl font-bold">
            {isArabic ? "تصفح معرضنا" : "Explore Our Gallery"}
          </h1>
          <p className="text-center text-gray-400 text-lg my-10">
            {isArabic
              ? "اكتشف مجموعتنا المختارة من المركبات المذهلة، التي تم اختيارها بعناية لتلائم مختلف الأذواق والاحتياجات. من السيارات الفاخرة إلى سيارات الدفع الرباعي القوية، كل مركبة في معرضنا تحكي قصة من الجودة والأداء والحرفية."
              : "Browse our curated collection of vehicles—from luxury sedans to rugged SUVs—crafted to meet every need and preference"}
          </p>
        </div>
        <Slider_image />
      </div>
    </div>
  );
}
