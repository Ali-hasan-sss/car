import InfoCard from "@/components/cards/adminCard/info_card";

export default function OurValues() {
  const cards = [
    {
      image: "images/glass.png",
      title: { ar: "Innovation", en: "kdkd" },
      des: {
        ar: "Constantly improving and adapting to provide cutting-edge solutions.",
        en: "dfdf",
      },
    },
    {
      image: "images/quality.png",
      title: { ar: "Innovation", en: "kdkd" },
      des: {
        ar: "Constantly improving and adapting to provide cutting-edge solutions.",
        en: "dfdf",
      },
    },
    {
      image: "images/shield.png",
      title: { ar: "Innovation", en: "kdkd" },
      des: {
        ar: "Constantly improving and adapting to provide cutting-edge solutions.",
        en: "dfdf",
      },
    },
    {
      image: "images/idea.png",
      title: { ar: "Innovation", en: "kdkd" },
      des: {
        ar: "Constantly improving and adapting to provide cutting-edge solutions.",
        en: "dfdf",
      },
    },
  ];
  return (
    <div className="py-[40px] px-[10px] md:px-[50px] flex flex-col items-center justify-center gap-[40px] bg-secondary1">
      <h2 className="title text-text_title text-center">Our Values</h2>
      <div className="flex flex-wrap gap-[50px] items-center justify-center">
        {cards.map((card, index) => (
          <InfoCard
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
