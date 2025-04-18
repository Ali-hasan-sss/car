import { useRouter } from "next/navigation";
import InfoCard_cust from "../cards/info_cardcust";

export default function HowItWorks() {
  const router = useRouter();
  const steps = [
    {
      imgSrc: "/images/contract1.png",
      alt: "step1",
      title: { ar: "Step 1: Request a Quote", en: "Step 1: Request a Quote" },
      description: {
        ar: "Fill out our online form with details about your car and shipping needs",
        en: "Fill out our online form with details about your car and shipping needs",
      },
    },
    {
      imgSrc: "/images/contract2.png",
      alt: "step2",
      title: {
        ar: "Step 2: Get a Personalized Plan",
        en: "Step 2: Get a Personalized Plan",
      },
      description: {
        ar: "Receive a customized plan, including costs and shipping timelines.",
        en: "Receive a customized plan, including costs and shipping timelines.",
      },
    },
    {
      imgSrc: "/images/contract3.png",
      alt: "step3",
      title: { ar: "Step 3: Arrange Shipping", en: "Step 3: Arrange Shipping" },
      description: {
        ar: "Confirm your booking, and our team handles the rest.",
        en: "Confirm your booking, and our team handles the rest.",
      },
    },
    {
      imgSrc: "/images/contract4.png",
      alt: "step4",
      title: {
        ar: "Step 4: Track Your Shipment",
        en: "Step 4: Track Your Shipment",
      },
      description: {
        ar: "Monitor your car’s journey with real-time tracking updates.",
        en: "Monitor your car’s journey with real-time tracking updates.",
      },
    },
  ];

  return (
    <div className="w-full px-[10px] md:px-[64px] py-[50px] bg-white">
      <div className="w-full">
        <div className="flex flex-col item-center justify-center gap-[20px]">
          <h1 className="stor-title text-center">How it works</h1>
          <p className="stor-des text-center mt-5">
            A simple and transparent process for stress-free car shipping
          </p>
          <div className="flex flex-wrap mt-4 items-center justify-center gap-5">
            {steps.map((step, index) => (
              <InfoCard_cust
                width="200"
                height="250"
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
            <button
              className="button_outline py-[10px] px-[24px] "
              onClick={() => router.push("/register")}
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
