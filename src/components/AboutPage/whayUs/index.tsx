import InfoCard_cust from "@/components/cards/info_cardcust";
import { useLanguage } from "@/context/LanguageContext";

export default function Whay_us() {
  const cards = [
    {
      image: "images/experience.png",
      title: { ar: "الخبرة والاحترافية", en: "Experience & Expertise" },
      des: {
        ar: "نمتلك فريقاً من المحترفين ذوي الخبرة الطويلة لنقدم لك أفضل الخدمات بأعلى جودة.",
        en: "With a team of seasoned professionals, we bring years of expertise to every service we offer.",
      },
    },
    {
      image: "images/customer-rate.png",
      title: { ar: "رضا العملاء", en: "Customer Satisfaction" },
      des: {
        ar: "نحرص دائماً على تقديم تجربة مرضية لعملائنا، مما يجعلنا الخيار الأول للكثيرين.",
        en: "We are committed to delivering a satisfying experience, making us the top choice for many customers.",
      },
    },
    {
      image: "images/technology.png",
      title: { ar: "التكنولوجيا الحديثة", en: "Advanced Technology" },
      des: {
        ar: "نستخدم أحدث التقنيات لضمان سرعة ودقة خدماتنا وتلبية توقعاتك.",
        en: "We leverage cutting-edge technology to ensure fast, accurate, and efficient services.",
      },
    },
    {
      image: "images/location.png",
      title: { ar: "خدمات في مواقع متعددة", en: "Multiple Locations" },
      des: {
        ar: "نقدم خدماتنا في مواقع متعددة لتكون أقرب إليك وأسهل في الوصول.",
        en: "We provide services in multiple locations, making it easier and more convenient for you.",
      },
    },
  ];
  const { isArabic } = useLanguage();
  return (
    <div className="py-[40px] px-[10px] md:px-[50px] flex flex-col items-center justify-center gap-1 bg-white">
      <h2 className="text-3xl font-bold text-text_title text-center">
        {isArabic ? "لماذا نحن؟" : " Why Chose Us ?"}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-16">
        {cards.map((card, index) => (
          <InfoCard_cust
            key={index}
            image={card.image}
            title={card.title}
            des={card.des}
            width="200"
            height="300"
          />
        ))}
      </div>
    </div>
  );
}
