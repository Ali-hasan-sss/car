import { useLanguage } from "@/context/LanguageContext";

export default function About_header() {
  const { isArabic } = useLanguage();
  return (
    <div className="py-[30px] md:py-[100px] px-[10px] md:px-[60px] flex items-center justify-center bg-secondary1 ">
      <div className="flex flex-col max-w-[700px] text-center items-center justify-center gap-[20px]">
        <h1 className="text-xl md:text-3xl font-bold">
          {isArabic ? "مهمتنا" : "Our Mission"}
        </h1>
        <p className="text-text_des text-lg">
          {isArabic
            ? "في 'Soufan Global'، تتمثل مهمتنا في تبسيط التجارة الدولية وخلق روابط سلسة بين الأسواق العالمية. نحن موجودون لتمكين الشركات من خلال تقديم خدمات استيراد وتصدير وتجارة عامة موثوقة وشفافة وفعّالة، تتوافق مع أعلى المعايير الدولية. نحن ملتزمون بتقديم القيمة من خلال خبرتنا العميقة في هذا القطاع، وشبكتنا العالمية الموثوقة، ونهجنا الشخصي الذي يضع احتياجات عملائنا في المقام الأول. سواءً كنا نسهل الخدمات اللوجستية عبر الحدود أو نوفر المنتجات من أسواق متنوعة، فإننا نسعى لأن نكون شريكًا يعتمد عليه للنمو والابتكار والتوسع العالمي."
            : " At Soufan Global, our mission is to simplify international trade and create seamless connections between global markets. We exist to  empower businesses by providing reliable, transparent, and efficient import, export, and general trade services that meet the highest international standards. We are committed to delivering value through our deep industry expertise, a trusted global network, and a personalized approach that puts our clients' needs first. Whether facilitating cross-border logistics or sourcing products from diverse  markets, we strive to be a dependable partner for growth, innovation, and global reach."}
        </p>
      </div>
    </div>
  );
}
