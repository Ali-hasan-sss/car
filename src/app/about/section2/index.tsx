import InfoCard_cust from "@/components/cards/info_cardcust";

export default function Our_services() {
  const cards = [
    {
      image: "images/hummer.png",
      title: { ar: "1. مزادات السيارات", en: "1. Car Auctions" },
      des: {
        ar: "اكتشف مجموعة واسعة من المركبات من خلال منصتنا الشفافة وسهلة الاستخدام للمزادات. قم بالمزايدة بثقة واحصل على السيارة التي تحلم بها.",
        en: "Discover a wide variety of vehicles through our transparent and user-friendly auction platform. Bid with confidence and secure the car of your dreams.",
      },
    },
    {
      image: "images/carSipping.png",
      title: { ar: "2. شحن السيارات", en: "2. Car Shipping" },
      des: {
        ar: "نحن نقدم خدمات شحن موثوقة وآمنة لمركبتك، مع تحديثات لحظية ودعم مستمر من البداية حتى التسليم.",
        en: "We offer reliable and secure vehicle shipping services, with real-time updates and full support from start to finish.",
      },
    },
    {
      image: "images/carSelling.png",
      title: { ar: "3. بيع السيارات", en: "3. Car Selling" },
      des: {
        ar: "قم ببيع سيارتك بسهولة من خلال منصتنا التي تضمن لك أفضل الأسعار وخدمة عملاء متميزة.",
        en: "Sell your car easily through our platform, ensuring you get the best price and excellent customer service.",
      },
    },
  ];

  return (
    <div className="py-[40px] px-[10px] md:px-[50px] flex flex-col items-center justify-center gap-4 bg-secondary1">
      <h2 className=" text-text_title text-3xl font-bold text-center">
        Our Core Services
      </h2>
      <div className="flex flex-wrap items-center justify-center">
        {cards.map((card, index) => (
          <InfoCard_cust
            key={index}
            image={card.image}
            title={card.title}
            width="300"
            height="300"
            des={card.des}
          />
        ))}
      </div>
    </div>
  );
}
