import { useLanguage } from "@/app/context/LanguageContext";

const Search: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="track relative w-2/5 bg-white h-[40px] flex items-center justify-between">
      {/* Input field */}
      <input
        type="text"
        placeholder={t("Enter_your_tracking_number")}
        className="input bg-white rounded p-2 w-full h-full"
      />
      {/* Button */}
      <button className="track-btn h-full px-[10px] bg-trackbtn text-light hover:bg-gray-500">
        {t("Track")}
      </button>
    </div>
  );
};

export default Search;
