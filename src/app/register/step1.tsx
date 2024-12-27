import { useLanguage } from "@/app/context/LanguageContext";
import { useState } from "react";

interface chooseTypeProps {
  cklick: (x: string) => void;
  validate: () => boolean;
}

const Step1: React.FC<chooseTypeProps> = ({ cklick }) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string>("");

  const handleClick = (type: string) => {
    setSelected(type);
    cklick(type);
  };

  // التحقق من الاختيار
  /*  validate = () => {
    return selected !== "";
  };*/

  return (
    <div className="w-full">
      <div className="input_group w-full flex items-center justify-between gap-[20px]">
        <div
          onClick={() => handleClick("1")}
          className={`input-box ${
            selected === "1" ? "active" : ""
          } w-[100px] h-[60px] flex items-center justify-center p-[8px]`}
        >
          {t("private")}
        </div>
        <div
          onClick={() => handleClick("2")}
          className={`input-box ${
            selected === "2" ? "active" : ""
          } w-[100px] h-[60px] flex items-center justify-center p-[8px]`}
        >
          {t("company")}
        </div>
      </div>

      <div className="label w-full mt-1 flex items-center justify-between gap-[20px]">
        <label className="w-[100px] text-sm text-gray-400 text-center">
          {t("private_des")}
        </label>
        <label className="w-[100px] text-sm text-gray-400 text-center">
          {t("company_des")}
        </label>
      </div>
    </div>
  );
};

export default Step1;
