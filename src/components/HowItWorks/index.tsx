import { useRouter } from "next/navigation";
import InfoCard_cust from "../cards/info_cardcust";

export default function HowItWorks() {
  const router = useRouter();
  const steps = [
    {
      imgSrc: "/images/contract1.png",
      alt: "step1",
      title: { ar: "الخطوة 1: طلب عرض سعر", en: "Step 1: Request a Quote" },
      description: {
        ar: "املأ النموذج الإلكتروني بالمعلومات حول سيارتك واحتياجات الشحن الخاصة بك.",
        en: "Fill out our online form with details about your car and shipping needs",
      },
    },
    {
      imgSrc: "/images/contract2.png",
      alt: "step2",
      title: {
        ar: "الخطوة 2: الحصول على خطة مخصصة",
        en: "Step 2: Get a Personalized Plan",
      },
      description: {
        ar: "سوف تتلقى خطة مخصصة تشمل التكاليف والجداول الزمنية للشحن.",
        en: "Receive a customized plan, including costs and shipping timelines.",
      },
    },
    {
      imgSrc: "/images/contract3.png",
      alt: "step3",
      title: { ar: "الخطوة 3: ترتيب الشحن", en: "Step 3: Arrange Shipping" },
      description: {
        ar: "أكد الحجز وسيتولى فريقنا كل شيء.",
        en: "Confirm your booking, and our team handles the rest.",
      },
    },
    {
      imgSrc: "/images/contract4.png",
      alt: "step4",
      title: { ar: "الخطوة 4: تتبع شحنتك", en: "Step 4: Track Your Shipment" },
      description: {
        ar: "تابع رحلة سيارتك من خلال التحديثات الفورية للتتبع.",
        en: "Monitor your car’s journey with real-time tracking updates.",
      },
    },
  ];

  return (
    <div className="w-full px-[10px] md:px-[64px] py-4 md:py-[50px] bg-secondary1">
      <div className="w-full">
        <div className="flex flex-col item-center justify-center gap-6">
          <h1 className="font-bold text-3xl text-center">How it works</h1>
          <p className="text-gray-500 font-normal text-lg text-center ">
            A simple and transparent process for stress-free car shipping
          </p>
          <div className="flex flex-wrap mt-4 items-center justify-center lg:justify-between gap-2">
            {steps.map((step, index) => (
              <InfoCard_cust
                width="250"
                height="250"
                key={index}
                image={step.imgSrc}
                title={step.title}
                des={step.description}
              />
            ))}
          </div>
          <div className="px-3 flex  items-center justify-center">
            <img src="/images/Vector.png" alt="victor" className="h-[40px]" />
          </div>
          <div className="px-3 mt-5 flex  items-center justify-center">
            <button
              className="button_outline py-1 px-4 "
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
