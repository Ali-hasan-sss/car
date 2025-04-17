import InfoCard_cust from "@/components/cards/info_cardcust";

export default function Whay_us() {
  const cards = [
    {
      image: "images/experience.png",
      title: { ar: "Experience & Expertise", en: "dd" },
      des: {
        ar: "With a team of seasoned professionals, we bring years of expertise to every service we offer.",
        en: "f",
      },
    },
    {
      image: "images/customer-rate.png",
      title: { ar: "Experience & Expertise", en: "dd" },
      des: {
        ar: "With a team of seasoned professionals, we bring years of expertise to every service we offer.",
        en: "f",
      },
    },
    {
      image: "images/technology.png",
      title: { ar: "Experience & Expertise", en: "dd" },
      des: {
        ar: "With a team of seasoned professionals, we bring years of expertise to every service we offer.",
        en: "f",
      },
    },
    {
      image: "images/location.png",
      title: { ar: "Experience & Expertise", en: "dd" },
      des: {
        ar: "With a team of seasoned professionals, we bring years of expertise to every service we offer.",
        en: "f",
      },
    },
  ];
  return (
    <div className="py-[40px] px-[10px] md:px-[50px] flex flex-col items-center justify-center gap-[40px] bg-white">
      <h2 className="title text-text_title text-center">Why Chose Us ?</h2>
      <div className="flex flex-wrap gap-[50px] items-center justify-center">
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
