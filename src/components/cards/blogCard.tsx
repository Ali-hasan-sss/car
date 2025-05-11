import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { Blog } from "@/Types/adminTypes";
import Link from "next/link";
import { Edit, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BlogCard({
  id,
  title,
  description,
  body,
  image,
  ondelete,
  onedit,
}: Blog) {
  const [imageSrc, setImageSrc] = useState(image);
  const [loading, setLoading] = useState(false);
  const [isArabic, setIsArabic] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => setLoading(false);
  const router = useRouter();
  // ✅ دالة لاستخراج النص بناءً على كونه كائنًا أو نصًا مباشرًا
  const getLocalizedText = (text: string | { en: string; ar: string }) => {
    if (typeof text === "string") return text;
    return isArabic ? text.ar : text.en;
  };
  const handleView = () => {
    localStorage.setItem("itemselected", String(id));
    router.push("/admin/dashboard/blogs/details");
  };

  return (
    <div className="relative flex flex-col w-[300px] h-auto border bg-secondary1 items-center">
      <div className="relative w-full h-[200px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="loader"></span>
          </div>
        )}
        <img
          src={imageSrc}
          alt={getLocalizedText(title)}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className="flex flex-1 w-full flex-col items-center p-2">
        <div className="flex w-full items-start justify-between">
          <h1 className="text-text_title font-bold text-xl">
            {getLocalizedText(title)}
          </h1>
          {/* ✅ إظهار زر التبديل فقط إذا كان النص يدعم اللغتين */}
          {typeof title !== "string" ? (
            <div className="px-2 flex items-center gap-2">
              <span className="text-sm font-medium">
                {isArabic ? "AR" : "EN"}
              </span>
              <Switch
                onChange={() => setIsArabic(!isArabic)}
                checked={isArabic}
                color="primary"
              />
            </div>
          ) : (
            <Link
              href={`blog/${id}`}
              className="text-blue-500 text-sm underline mt-2"
            >
              عرض المقال
            </Link>
          )}
        </div>

        {/* ✅ محتوى المقالة */}
        <div className="flex w-full items-start justify-start flex-col h-[150px] overflow-y-auto p-2">
          <p className="text-text_des text-lg">{getLocalizedText(body)}</p>
        </div>
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="text-blue-500 text-sm underline mt-2"
        >
          {showDescription ? "إخفاء الوصف" : "عرض وصف المقالة"}
        </button>

        {/* ✅ عرض الوصف عند الحاجة */}
        {showDescription && (
          <div className="flex w-full items-start justify-start flex-col mt-2 p-2 bg-gray-100 rounded-md">
            <p className="text-text_des text-lg">
              {getLocalizedText(description)}
            </p>
          </div>
        )}
      </div>
      {typeof title !== "string" && (
        <div className="flex w-full items-center px-5 py-2 gap-4">
          <button
            onClick={ondelete}
            className="flex items-center justify-center w-[30px] h-[30px] bg-red-100 p-1 rounded-full"
          >
            <Trash />
          </button>
          <button
            onClick={handleView}
            className="flex items-center justify-center w-[30px] h-[30px] bg-blue-100 p-1 rounded-full"
          >
            <Eye />
          </button>
          <button
            onClick={onedit}
            className="flex items-center justify-center w-[30px] h-[30px] bg-yellow-100 p-1 rounded-full"
          >
            <Edit />
          </button>
        </div>
      )}
    </div>
  );
}
