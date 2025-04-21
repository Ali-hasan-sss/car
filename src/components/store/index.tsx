import { useLanguage } from "@/context/LanguageContext";
import Slider_card from "./slider";
import "./store.css";
import Tabs from "./tabs";
export default function Store() {
  const { t } = useLanguage();
  return (
    <div className="w-full px-[10px] py-[20px] md:px-[64px] md:py-[50px] bg-white ">
      <div className="w-full ">
        <div className=" flex flex-col py-2 gap-2">
          <h1 className="font-bold text-3xl">{t("store_title")}</h1>
          <p className="text-gray-500 text-sm font-normal">{t("store_des")}</p>
        </div>
        <Tabs />
        <Slider_card />
      </div>
    </div>
  );
}
