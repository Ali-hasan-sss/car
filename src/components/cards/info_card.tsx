import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Edit, Eye, Trash } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface InfoCardProps {
  id: number;
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
  id,
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
  const [isArabic, setIsArabic] = useState(true);
  const { t } = useLanguage();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    setImageSrc(image);
    setLoading(true);
  }, [image]);

  const handleImageLoad = () => setLoading(false);
  const oneView = () => {
    localStorage.setItem("itemselected", String(id));
    window.location.replace("/admin/dashboard/services/details");
  };
  const handleImageError = () => {
    setLoading(false);
    setImageSrc("/images/default-placeholder.png");
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 ${className} p-2 justify-center overflow-hidden`}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      {user?.userRole === "ADMIN" && (
        <div className="px-2 flex items-center gap-2">
          <span className="text-sm font-medium">{isArabic ? "AR" : "EN"}</span>
          <Switch
            checked={isArabic}
            onChange={() => setIsArabic((prev) => !prev)}
            color="primary"
          />
        </div>
      )}

      <div className="relative w-full flex items-center justify-center h-[100px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="loader"></span>
          </div>
        )}
        <img
          src={imageSrc}
          className="w-[75px]"
          alt="service"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className="flex w-full items-start justify-between">
        <h2 className="text-text_title text-2xl font-bold text-center line-clamp-2">
          {isArabic ? title.ar : title.en}
        </h2>
      </div>
      <p className="text-text_des text-sm overflow-y-auto max-h-[80px]">
        {isArabic ? des.ar : des.en}
      </p>
      {body && (
        <p className="text-text_des text-sm overflow-y-auto max-h-[80px]">
          {isArabic ? body.ar : body.en}
        </p>
      )}

      {user?.userRole === "ADMIN" && (
        <div className="flex w-full items-center px-5 py-2 gap-4">
          <button
            onClick={ondelete}
            title={t("Delete")}
            className="flex items-center justify-center w-[30px] h-[30px] bg-red-100 p-1 rounded-full"
          >
            <Trash />
          </button>

          <button
            onClick={onedit}
            title={t("Edit")}
            className="flex items-center justify-center w-[30px] h-[30px] bg-yellow-100 p-1 rounded-full"
          >
            <Edit />
          </button>

          <button
            onClick={oneView}
            title={t("View")}
            className="flex items-center justify-center w-[30px] h-[30px] bg-blue-100 p-1 rounded-full"
          >
            <Eye />
          </button>
        </div>
      )}
    </div>
  );
}
