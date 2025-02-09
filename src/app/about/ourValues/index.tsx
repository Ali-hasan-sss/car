import InfoCard from "@/components/cards/info_card";

export default function OurValues() {
  const cards = [
    {
      image: "images/glass.png",
      title: "Transparency",
      des: "Clear processes, no hidden fees, and honest communication.",
    },
    {
      image: "images/quality.png",
      title: "Quality",
      des: "A commitment to delivering top-notch services at every step.",
    },
    {
      image: "images/shield.png",
      title: "Integrity",
      des: "Building trust through ethical practices and professional conduct.",
    },
    {
      image: "images/idea.png",
      title: "Innovation",
      des: "Constantly improving and adapting to provide cutting-edge solutions.",
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
