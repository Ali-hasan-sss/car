import { useLanguage } from "@/app/context/LanguageContext";

export default function Fillter() {
  const { t } = useLanguage();
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
        <h1 className="fillter-title">{t("hero_title")}</h1>
        <p className="fillter-des">{t("hero_des")}</p>
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
        {/**port information  */}
        <div className="fillter p-[10px] sm:p-[0px] gap-[20px]">
          <p className="text-primary1 mt-4">Select your address</p>

          <div className="flex w-full flex-wrap items-start justify-start gap-4">
            {/* Select your address */}
            <div className="flex border rounded bg-white h-[35px] py-[8px] px-[12px] ">
              <select id="address" className="  focus:outline-none">
                <option value="">Select your address</option>
                <option value="address1">Address 1</option>
                <option value="address2">Address 2</option>
                <option value="address3">Address 3</option>
              </select>
            </div>

            {/* Shipping Port */}
            <div className="flex border rounded bg-white  h-[35px] py-[8px] px-[12px]">
              <select id="port" className=" bg-white focus:outline-none">
                <option value="">Select shipping port</option>
                <option value="port1">Port 1</option>
                <option value="port2">Port 2</option>
                <option value="port3">Port 3</option>
              </select>
            </div>

            {/* Car */}
            <div className="flex border rounded bg-white  h-[35px] py-[8px] px-[12px]">
              <select id="car" className=" focus:outline-none ">
                <option value="">Select your car</option>
                <option value="car1">Car 1</option>
                <option value="car2">Car 2</option>
                <option value="car3">Car 3</option>
              </select>
            </div>
          </div>
        </div>
        {/**email address */}
        <div className="fillter p-[10px] sm:p-[0px] gap-[20px]">
          <p className="text-primary1 mt-4">Enter Your Email Address </p>
          <div className="flex  h-[56px] bg-white px-[12px] py-[8px] gap-[18px] border rounded items-start justify-start gap-4">
            <div className="flex gap-[12px] w-full h-full item-center ">
              <div className="w-[24px] h-[24px] relative item-center justify-center mt-[10px]">
                <img src="/images/email-icon.png" alt="email" />
              </div>
              <div className="input flex item-center w-full justify-center">
                <input
                  type="email"
                  placeholder="mail@example.com"
                  className=" bg-white focus:outline-none text-xl mb-1 w-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/**action */}
        <div className="action w-full h-80px flex item-center justify-center py-[16px]">
          <button className="btn w-[195px] h-[48px] rounded py-[12px] px-[24px] text-blue-200  bg-primary1 hover:bg-transparent hover:border-primary1 hover:text-black ">
            Get Instant Quote up
          </button>
        </div>
      </div>
    </div>
  );
}
