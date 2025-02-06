import Info_card from "./info_card";

export default function HowItWorks() {
  const steps = [
    {
      imgSrc: "/images/contract1.png",
      alt: "step1",
      title: "Step 1: Request a Quote",
      description:
        "Fill out our online form with details about your car and shipping needs",
    },
    {
      imgSrc: "/images/contract2.png",
      alt: "step2",
      title: "Step 2: Get a Personalized Plan",
      description:
        "Receive a customized plan, including costs and shipping timelines.",
    },
    {
      imgSrc: "/images/contract3.png",
      alt: "step3",
      title: "Step 3: Arrange Shipping",
      description: "Confirm your booking, and our team handles the rest.",
    },
    {
      imgSrc: "/images/contract4.png",
      alt: "step4",
      title: "Step 4: Track Your Shipment",
      description:
        "Monitor your car’s journey with real-time tracking updates.",
    },
  ];

  return (
    <div className="w-full px-[10px] md:px-[64px] py-[10px] md:py-[50px] bg-white">
      <div className="w-full">
        <div className="flex flex-col item-center justify-center gap-[20px]">
          <h1 className="stor-title text-center">How it works</h1>
          <p className="stor-des text-center mt-5">
            A simple and transparent process for stress-free car shipping
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {steps.map((step, index) => (
              <Info_card
                key={index}
                image={step.imgSrc}
                title={step.title}
                des={step.description}
              />
            ))}
          </div>
          <div className="px-3 flex  items-center justify-center">
            <img src="/images/Vector.png" alt="victor" className="h-[50px]" />
          </div>
          <div className="px-3 mt-5 flex  items-center justify-center">
            <button className="start-btn py-[10px] px-[24px] ">
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
