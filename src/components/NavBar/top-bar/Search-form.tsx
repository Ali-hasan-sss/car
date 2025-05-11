import { useLanguage } from "../../../context/LanguageContext";
interface Searchprops {
  width?: string;
}
export default function Truck({ width }: Searchprops) {
  const { t } = useLanguage();

  return (
    <div
      className={`track relative   w-${width} bg-white h-[40px] flex items-center justify-between`}
    >
      {/* Input field */}
      <input
        type="text"
        placeholder={t("Enter_your_tracking_number")}
        className="input bg-white rounded p-2 w-full h-full"
      />
      {/* Button */}
      <button className="track-btn h-full px-[10px] bg-trackbtn  text-white hover:bg-primary1">
        {t("Track")}
      </button>
    </div>
  );
}
