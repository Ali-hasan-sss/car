export default function Brands() {
  const brands = [
    "/images/brand1.png",
    "/images/brand2.png",
    "/images/brand1.png",
    "/images/brand2.png",
    "/images/brand1.png",
    "/images/brand2.png",
    "/images/brand1.png",
    "/images/brand2.png",
    "/images/brand1.png",
    "/images/brand2.png",
    "/images/brand1.png",
  ];

  return (
    <div className="container py-[20px] md:py-[50px] flex flex-col items-center gap-[20px]">
      <h4 className="heading">
        Trusted by the worlds best companies [social proof to build credibility]
      </h4>
      <div className="brands_container flex flex-wrap items-center justify-center gap-[25px] py-[8px]">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="brands_box flex items-center justify-center w-[140px] h-[56px]"
          >
            <img src={brand} alt={`Brand ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
