import { useLanguage } from "@/context/LanguageContext";

export default function About_section2() {
  const { isArabic } = useLanguage();
  return (
    <div className="py-[30px] px-2 md:px-10 bg-white block md:flex items-center justify-center gap-8 ">
      <div className="w-full md:w-1/2 flex flex-col ">
        <div className="heading flex flex-col gap-[16px]">
          <h1 className="text-xl md:text-3xl font-bold">
            {isArabic ? "إنجازاتنا بالأرقام" : "Our Impact in Numbers"}
          </h1>
          <p className="text-sm text-text_des md:text-lg">
            {isArabic
              ? "من تأمين المركبات إلى شحنها حول العالم، تعكس أرقامنا الثقة والنتائج التي حققناها. إليك لمحة سريعة عن أبرز إنجازاتنا ونمونا المستمر."
              : "From sourcing vehicles to delivering them across continents, our numbers reflect the trust and results we've built. Here’s a quick glance at our achievements and continued growth."}
          </p>
        </div>
        <div className="py-[8px] flex flex-col px-10 gap-10 mt-5">
          <div className=" flex items-center justify-between  gap-3">
            <div className=" flex flex-col items-center text-center justify-center gap-[8px]">
              <h2 className="text-2xl font-bold text-primary1">500+</h2>
              <p className="text-xl font-bold">
                {isArabic ? "انجاز مكتمل" : "Projects completed"}
              </p>
            </div>
            <div className=" flex items-center text-center justify-center flex-col gap-[8px]">
              <h2 className="text-2xl font-bold text-primary1">200%</h2>
              <p className="text-xl font-bold">
                {isArabic ? "النمو السنوي" : "Year on year growth"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 md:px-10 mt-6  gap-3">
            <div className="flex flex-col items-center text-center justify-center  gap-[8px]">
              <h2 className="text-2xl font-bold text-primary1">$50m</h2>
              <p className="text-xl font-bold">
                {isArabic ? "الوصول" : "Funded"}
              </p>
            </div>
            <div className=" flex flex-col items-center text-center justify-center gap-[8px]">
              <h2 className="text-2xl font-bold text-primary1">10k</h2>
              <p className="text-xl font-bold">
                {isArabic ? "التحميل" : "Downloads"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img src="/images/Placeholder2.png" alt="Placeholder2" />
      </div>
    </div>
  );
}
