import { useLanguage } from "@/context/LanguageContext";

export default function Tabs() {
  const tabs = [
    { en: "All", ar: "الكل" },
    { en: "Used cars", ar: "سيارات مستعملة" },
    { en: "New cars", ar: "سيارات جديدة" },
  ];
  const { isArabic } = useLanguage();
  return (
    <div className="w-full mt-2 gap-[10px] item-center flex flex-wrap">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`button text-xs px-3 py-1 flex item-center justify-center  ${
            index === 0 ? "active-tab" : ""
          }`}
        >
          <div>{isArabic ? tab.ar : tab.en}</div>
        </div>
      ))}
    </div>
  );
}
