import Card from "./card";

export default function Success() {
  const success = [
    {
      successImage: "/images/ship.png",
      count: 10,
      des: "Vehicles shipped to Oman and beyond",
    },
    {
      successImage: "/images/date.png",
      count: 5,
      des: "Years of Experience",
    },
    {
      successImage: "/images/worldwide.png",
      count: 4,
      des: "Global shipping destinations",
    },
  ];
  return (
    <div className="py-[30px] px-[10px] md:px-[96px] bg-secondary1 ">
      <div className="title flex item-center justify-center">
        <h1 className="title">Success Numbers</h1>
      </div>
      <div className="flex flex-wrap items-center   gap-[25px] justify-center py-[40px] px-[5px] ">
        {success.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    </div>
  );
}
