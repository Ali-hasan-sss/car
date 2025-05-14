import { useLanguage } from "@/context/LanguageContext";

export default function About_section1() {
  const { isArabic } = useLanguage();
  return (
    <div className="py-10 px-2 md:px-10 bg-white ">
      <div className="block md:flex gap-[80px] items-center justify-between  ">
        <div className=" w-full py-4 md:w-1/2">
          <h1 className="text-xl md:text-3xl font-bold">
            {isArabic
              ? "كيف نشأت شركتنا"
              : "Tell the story of how our company came about"}
          </h1>
        </div>
        <div className="w-full py-4 md:w-1/2">
          <p className="text-text_des text-lg">
            {isArabic
              ? "لماذا توجد شركتنا – بيان المهمة في Soufan Global، تتمثل مهمتنا في تبسيط عملية شراء وبيع السيارات للعملاء حول العالم. نحن ملتزمون بتقديم خدمات شفافة وآمنة وفعّالة في مجالات مزادات السيارات، وشحن المركبات، وبيع السيارات.من خلال الاستفادة من التكنولوجيا المتقدمة والخبرة العميقة في هذا القطاع، نسعى إلى تقديم قيمة استثنائية وتجاوز توقعات عملائنا."
              : "Why Our Company Exists – Mission Statement At Soufan Global, our mission is to simplify the automotive process for customers around the world. We are committed to delivering transparent, secure, and efficient services in car auctions, vehicle shipping, and auto sales. By leveraging advanced technology and deep industry expertise, we aim to provide exceptional value while exceeding expectations."}
          </p>
        </div>
      </div>
      <div className="placeholder w-full md:h-[75vh]  overflow-hidden "></div>
    </div>
  );
}
