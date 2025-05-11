import { useLanguage } from "@/context/LanguageContext";
import Card from "./card";

export default function Success() {
  const success = [
    {
      successImage: "/images/ship.png",
      count: 10,
      des: {
        en: "Vehicles shipped to Oman and beyond",
        ar: "مركبات تم شحنها إلى عُمان وخارجها",
      },
    },
    {
      successImage: "/images/date.png",
      count: 5,
      des: {
        en: "Years of Experience",
        ar: "سنوات من الخبرة",
      },
    },
    {
      successImage: "/images/worldwide.png",
      count: 4,
      des: {
        en: "Global shipping destinations",
        ar: "وجهات شحن عالمية",
      },
    },
  ];

  const { isArabic } = useLanguage();
  return (
    <div className="py-[30px] px-[10px] md:px-[96px] bg-white ">
      <div className="title flex item-center justify-center">
        <h1 className="text-3xl font-bold">
          {isArabic ? "مؤشرات النجاح" : "Success Numbers"}
        </h1>
      </div>
      <div className="flex flex-wrap items-center   gap-[25px] justify-center py-[40px] px-[5px] ">
        {success.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    </div>
  );
}
