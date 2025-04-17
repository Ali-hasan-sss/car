import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import TextSelector from "../inputs/selectors/text_selector";

export default function Cotation() {
  const { t } = useLanguage();
  const items = [
    { src: "/images/sedan.png", alt: "sedan", label: "Car" },
    { src: "/images/pickup-truck.png", alt: "pickup-truck", label: "Pickup" },
    { src: "/images/van.png", alt: "SUV", label: "SUV" },
    { src: "/images/bus.png", alt: "bus", label: "Min bus" },
  ];
  const [car, setCar] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [shippingPort, setShippingPort] = useState("");
  const message = `يريد المستخدم صاحب الايميل ${email} الاستفسار عن شحن سيارة ${car} من ${shippingPort} الى ${address}`;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!car) newErrors.car = "select car category*";
    if (!address) newErrors.address = "select your address*";
    if (!shippingPort) newErrors.shippingPort = "select shippingPort*";
    if (!email) {
      newErrors.email = "the Email is requaier";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Enter valed Email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) console.log("message:", message);
  };

  return (
    <div className="fillter w-full ">
      <div className="text">
        <h1 className="fillter-title">{t("hero_title")}</h1>
        <p className="fillter-des">{t("hero_des")}</p>
        <div className="fillter p-[10px] sm:p-[0px] gap-[20px]">
          <p className="text-primary1">What are you shipping?</p>
          {/* cars category */}
          <div className="flex flex-wrap mt-2 items-start justify-start gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className={`article box cursor-pointer gap-[18px] flex items-center justify-center w-[150px] h-[50px] py-[8px] px-[12px] bg-white border rounded ${
                  car === item.label ? "activ" : ""
                } ${errors.car ? "error" : ""}`}
                onClick={() => setCar(item.label)}
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

          <div className="flex w-full mt-2 flex-wrap items-start justify-start gap-4">
            {/* Select your address */}
            <div className=" bg-white w-1/3 ">
              <TextSelector
                options={[
                  { value: "masquat", label: "Masquat" },
                  { value: "aldoqm", label: "Aldoqm" },
                ]}
                placeholder="masquat"
                value={address}
                onChange={(val) => {
                  setAddress(String(val));
                }}
                error={errors.address}
              />
            </div>
            <div className=" bg-white w-1/3 ">
              <TextSelector
                options={[{ value: "torinto", label: "Torinto" }]}
                value={shippingPort}
                placeholder="Shipping Port"
                onChange={(val) => {
                  setShippingPort(String(val));
                }}
                error={errors.shippingPort}
              />
            </div>
          </div>
        </div>
        {/**email address */}
        <div className="fillter p-[10px] sm:p-[0px] gap-[20px]">
          <p className="text-primary1 mt-4">Enter Your Email Address </p>
          <div
            className={`flex  h-[56px] bg-white px-[12px] py-[8px] gap-[18px] border rounded items-start justify-start gap-4 ${
              errors.email ? "border-red-500" : ""
            }`}
          >
            <div className="flex gap-[12px] w-full h-full item-center ">
              <div className="w-[24px] h-[24px] relative item-center justify-center mt-[10px]">
                <img src="/images/email-icon.png" alt="email" />
              </div>
              <div className="input flex item-center w-full justify-center">
                <input
                  type="email"
                  placeholder="mail@example.com"
                  className=" bg-white focus:outline-none text-xl mb-1 w-full"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 ms-2">{errors.email}</p>
          )}
        </div>
        {/**action */}
        <div className="action w-full h-80px flex item-center justify-center py-[16px]">
          <button
            className="button_bordered rounded py-[12px] px-[24px] text-blue-200 "
            onClick={handleSubmit}
          >
            Get Instant Quote up
          </button>
        </div>
      </div>
    </div>
  );
}
