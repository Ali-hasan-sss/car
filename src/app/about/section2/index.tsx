import InfoCard from "@/components/cards/adminCard/info_card";

export default function Our_services() {
  const cards = [
    {
      image: "images/hummer.png",
      title: { ar: "1. Car Auctions", en: "gdgdgdg" },
      des: {
        ar: "Discover a wide variety of vehicles through our transparent and user-friendly auction platform. Bid with confidence and secure the car of your dreams.",
        en: "ss",
      },
    },
    {
      image: "images/carSipping.png",
      title: { ar: "1. Car Auctions", en: "xdd" },
      des: {
        ar: "Discover a wide variety of vehicles through our transparent and user-friendly auction platform. Bid with confidence and secure the car of your dreams.",
        en: "ddd",
      },
    },
    {
      image: "images/carSelling.png",
      title: { ar: "1. Car Auctions", en: "ff" },
      des: {
        ar: "Discover a wide variety of vehicles through our transparent and user-friendly auction platform. Bid with confidence and secure the car of your dreams.",
        en: "dcc",
      },
    },
  ];
  return (
    <div className="py-[40px] px-[10px] md:px-[50px] flex flex-col items-center justify-center gap-[40px] bg-secondary1">
      <h2 className="title text-text_title text-center">Our Core Services</h2>
      <div className="flex flex-wrap gap-[50px] items-center justify-center">
        {cards.map((card, index) => (
          <InfoCard
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
