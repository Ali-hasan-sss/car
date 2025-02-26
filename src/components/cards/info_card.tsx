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

export default function InfoCard({
  image,
  title,
  des,
  body,
  ondelete,
  onedit,
  height,
  width,
  className,
}: InfoCardProps) {
  const [imageSrc, setImageSrc] = useState(image);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImageSrc(image);
    setLoading(true);
  }, [image]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setImageSrc("/images/default-placeholder.png"); // صورة افتراضية في حال حدوث خطأ
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 ${className} h-[${height}px] w-[${width}px] p-[20px] justify-center`}
    >
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="loader"></span> {/* عنصر تحميل متحرك */}
          </div>
        )}
        <img
          src={imageSrc}
          className="w-[50px]"
          alt="service"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <h2 className="text-text_title text-2xl font-bold text-center">
        {title.ar}||
        {title.en}
      </h2>
      <p className="text-text_des text-xl">
        {des.ar} || {des.en}
      </p>
      {body && (
        <p className="text-text_des text-xl">
          {body.ar}||{body.en}
        </p>
      )}
      <div className="flex w-full items-center px-5 py-2 gap-4">
        <button
          onClick={ondelete}
          className="flex items-center justify-center w-[30px] h-[30px] bg-red-100 p-1 rounded-full"
        >
          <img src="/images/redtrash.png" width={14} alt="trash" />
        </button>
        <button
          onClick={onedit}
          className="flex items-center justify-center w-[30px] h-[30px] bg-yellow-100 p-1 rounded-full"
        >
          <img src="/images/edit.png" width={14} alt="edit" />
        </button>
      </div>
    </div>
  );
}
