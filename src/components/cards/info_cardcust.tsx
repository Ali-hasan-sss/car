import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

interface InfoCardProps {
  image: string;
  title: { ar?: string; en?: string };
  des: { ar?: string; en?: string };
  body?: { ar?: string; en?: string };
  ondelete?: () => void;
  onedit?: () => void;
  height?: string;
  width?: string;
  className?: string;
}

export default function InfoCard_cust({
  image,
  title,
  des,
  body,
  height,
  width,
  className,
}: InfoCardProps) {
  const [imageSrc, setImageSrc] = useState(image);
  const [loading, setLoading] = useState(true);
  const { isArabic } = useLanguage();
  useEffect(() => {
    setImageSrc(image);
    setLoading(true);
  }, [image]);

  const handleImageLoad = () => setLoading(false);

  const handleImageError = () => {
    setLoading(false);
    setImageSrc("/images/default-placeholder.png");
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 ${className} h-[${height}px] w-[${width}px] p-2 justify-center`}
    >
      <div className="relative w-full flex items-center justify-center h-1/2">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="loader"></span>
          </div>
        )}
        <img
          src={imageSrc}
          className="w-[65px]"
          alt="service"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className=" w-full">
          <h2 className="text-text_title text-center text-lg font-bold text-center">
            {isArabic ? title.ar : title.en}
          </h2>
        </div>
        <p className="text-text_des text-center text-[12px]">
          {isArabic ? des.ar : des.en}
        </p>
        {body && (
          <p className="text-text_des text-center text-[12px]">
            {isArabic ? body.ar : body.en}
          </p>
        )}
      </div>
    </div>
  );
}
