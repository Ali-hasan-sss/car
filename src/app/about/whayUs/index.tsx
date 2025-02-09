import InfoCard from "@/components/cards/info_card";

export default function Whay_us() {
  const cards = [
    {
      image: "images/experience.png",
      title: "Experience & Expertise",
      des: "With a team of seasoned professionals, we bring years of expertise to every service we offer.",
    },
    {
      image: "images/customer-rate.png",
      title: "Customer-Centric Approach",
      des: "Your satisfaction is at the heart of everything we do, and we are committed to delivering a smooth and hassle-free experience.",
    },
    {
      image: "images/technology.png",
      title: "Advanced Technology",
      des: "We leverage the latest tools and platforms to streamline processes and ensure efficiency.",
    },
    {
      image: "images/location.png",
      title: "Global Reach",
      des: " Whether you’re bidding on cars, shipping vehicles internationally, or selling locally, we’ve got you covered with a wide network and reliable logistics.",
    },
  ];
  return (
    <div className="py-[40px] px-[10px] md:px-[50px] flex flex-col items-center justify-center gap-[40px] bg-white">
      <h2 className="title text-text_title text-center">Why Chose Us ?</h2>
      <div className="flex flex-wrap gap-[50px] items-center justify-center">
        {cards.map((card, index) => (
          <InfoCard
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
