import { useLanguage } from "@/context/LanguageContext";
import Card from "./card";
import { Boxs } from "./data";
export default function Section3() {
  const { isArabic } = useLanguage();
  return (
    <div className="w-full px-2 md:px-10 ">
      <div className="flex flex-col items-center justify-center gap-10 py-[60px] ">
        <div className="heading max-w-[700px] flex flex-col items-center justify-center gap-4">
          <h2 className="text-xl md:text-3xl font-bold text-center">
            {isArabic ? "معلومات عن Soufan Global" : "About Soufan Global"}
          </h2>
          <p className="text-text_des text-sm md:text-lg text-center">
            {isArabic
              ? "نحن شركة متخصصة في استيراد وتصدير المركبات من أمريكا وكندا، نقدم حلولًا موثوقة تشمل الشراء، المزايدة في المزادات، والشحن الدولي بخبرة وشفافية."
              : "We are a specialized company in vehicle import and export from the US and Canada, offering reliable solutions including purchasing, auction bidding, and international shipping with expertise and transparency."}
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-[25px] items-start  justify-center md:justify-between">
          {Boxs.map((Box, index) =>
            isArabic ? (
              <Card
                image={Box.image}
                title={Box.title.ar}
                des={Box.des.ar}
                key={index}
              />
            ) : (
              <Card
                image={Box.image}
                title={Box.title.en}
                des={Box.des.en}
                key={index}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
