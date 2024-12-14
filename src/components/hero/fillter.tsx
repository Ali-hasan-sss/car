export default function Fillter() {
  const items = [
    { src: "/images/sedan.png", alt: "sedan", label: "Car" },
    { src: "/images/pickup-truck.png", alt: "pickup-truck", label: "Pickup" },
    { src: "/images/motorcycle.png", alt: "motorcycle", label: "Motorcycle" },
    { src: "/images/van.png", alt: "van", label: "Van" },
    { src: "/images/bus.png", alt: "bus", label: "Min bus" },
  ];
  return (
    <div className="fillter w-full ">
      <div className="text">
        <h1 className="fillter-title">Simplify Your Car Import Journey!</h1>
        <p className="fillter-des">
          Comprehensive services to import and ship cars from Canada to Oman
        </p>
        <div className="fillter p-[10px] sm:p-[0px] gap-[20px]">
          <p className="text-primary1">What are you shipping?</p>
          {/* cars category */}
          <div className="flex flex-wrap items-start justify-start gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="article gap-[18px] flex items-center justify-center w-[150px] h-[50px] py-[8px] px-[12px] bg-white border rounded"
              >
                <img src={item.src} alt={item.alt} width={40} height={40} />
                <div className="flex items-center justify-center">
                  <p className="text-primary1 text-center">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fillter p-[10px] sm:p-[0px] gap-[20px]">
          <p className="text-primary1">Select your address </p>
        </div>
      </div>
    </div>
  );
}
