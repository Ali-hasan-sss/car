import { useLanguage } from "@/context/LanguageContext";

export default function End_Section() {
  const { isArabic } = useLanguage();
  return (
    <>
      <div className="flex flex-col py-[30px] px-[10px] md:px-[50px] gap-[10px]">
        <h2 className="text-text_title text-3xl font-bold ">
          {isArabic ? "فريقنا" : "Our Team"}
        </h2>
        <p className="text-text_des text-sm">
          {isArabic
            ? "في شركة سوفان جلوبال، نفتخر بوجود فريق متنوع من الخبراء الملتزمين بتقديم خدمة متميزة. من دعم العملاء إلى خدمات الشحن، يركز كل فرد من فريقنا على ضمان تجربة سلسة وفعّالة وممتعة لك."
            : "At Soufan Global, we’re proud to have a diverse team of experts dedicated to delivering outstanding service. From customer support to logistics, every team member is focused on ensuring your experience is smooth, efficient, and enjoyable."}
        </p>
      </div>
      <div className="flex flex-col py-[30px] px-[10px] md:px-[50px] gap-[10px]">
        <h2 className="text-text_title text-3xl font-bold ">
          {isArabic
            ? "لننطلق معًا نحو المستقبل"
            : "Let’s Drive Forward Together"}
        </h2>
        <p className="text-text_des text-sm">
          {isArabic
            ? "نحن هنا لجعل عملية السيارات أسهل وأسرع وأكثر راحة لك. سواء كنت تشتري أو تبيع أو تشحن سيارة، فإن شركة سوفان جلوبال هي شريكك الموثوق في كل خطوة من الطريق."
            : "We’re here to make the automotive process easier, faster, and more convenient for you. Whether you’re buying, selling, or shipping a car, Soufan Global is your trusted partner every step of the way."}
        </p>
      </div>
    </>
  );
}
