import ExportBtn from "@/components/buttons/btn/exportBtn";
import Btn_outlin from "@/components/buttons/btn/outline_btn";

interface TitleBarProps {
  title: string;
  btnLabel?: string;
  btnImage?: string;
  uploadBtn?: boolean;
  onClick?: () => void;
}
export default function TitleBar({
  title,
  btnLabel,
  btnImage,
  uploadBtn,
  onClick,
}: TitleBarProps) {
  return (
    <div className="flex items-center w-full  justify-between py-2">
      <h1 className="text-text_title font-bold text-2xl">{title}</h1>
      <div className="flex items-center  gap-4">
        {btnLabel && (
          <Btn_outlin
            label={btnLabel}
            onClick={onClick || (() => {})}
            className="h-[12px]"
          />
        )}
        {uploadBtn && <ExportBtn />}
        {btnImage && <img src={`/images/${btnImage}`} />}
      </div>
    </div>
  );
}
