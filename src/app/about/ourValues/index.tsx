import InfoCard_cust from "@/components/cards/info_cardcust";

export default function OurValues() {
  const cards = [
    {
      image: "images/glass.png",
      title: { ar: "الابتكار", en: "Innovation" },
      des: {
        ar: "نواصل التحسين والتطور لتقديم حلول مبتكرة وعصرية تلبي تطلعاتك.",
        en: "Constantly improving and adapting to provide cutting-edge solutions.",
      },
    },
    {
      image: "images/quality.png",
      title: { ar: "الجودة", en: "Quality" },
      des: {
        ar: "نلتزم بأعلى معايير الجودة لضمان رضاك وثقتك بخدماتنا.",
        en: "Dedicated to maintaining the highest standards of quality in all our services.",
      },
    },
    {
      image: "images/shield.png",
      title: { ar: "الأمان", en: "Security" },
      des: {
        ar: "نضمن لك تجربة آمنة وموثوقة من خلال نظام حماية متكامل.",
        en: "We ensure a safe and reliable experience through comprehensive security measures.",
      },
    },
    {
      image: "images/idea.png",
      title: { ar: "الإبداع", en: "Creativity" },
      des: {
        ar: "نتميز بحلول مبتكرة وأفكار إبداعية تضيف قيمة حقيقية لخدماتنا.",
        en: "We stand out with creative ideas and innovative solutions that add real value.",
      },
    },
  ];

  return (
    <div className="py-[40px] px-[10px] md:px-[50px] flex flex-col items-center justify-center gap-10 bg-secondary1">
      <h2 className="text-3xl font-bold text-text_title text-center">
        Our Values
      </h2>
      <div className="flex flex-wrap gap-16 items-center justify-center">
        {cards.map((card, index) => (
          <InfoCard_cust
            key={index}
            image={card.image}
            title={card.title}
            des={card.des}
            width="200"
            height="200"
          />
        ))}
      </div>
    </div>
  );
}
