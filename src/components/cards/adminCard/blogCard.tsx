import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { Blog } from "@/Types/adminTypes";
import Link from "next/link";

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

  return (
    <div className="relative flex flex-col w-[300px]  h-auto border bg-secondary1 items-center">
      <div className="relative w-full h-[200px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="loader"></span>
          </div>
        )}
        <img
          src={imageSrc}
          alt={isArabic ? title.ar : title.en}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className="flex flex-1 w-full flex-col items-center p-2">
        <div className="flex w-full items-start justify-between">
          <h1 className="text-text_title font-bold text-xl">
            {isArabic ? title.ar : title.en}
          </h1>
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
        </div>

        {/* ✅ محتوى المقالة */}
        <div className="flex w-full items-start justify-start flex-col h-[150px] overflow-y-auto p-2">
          <p className="text-text_des text-lg">
            {isArabic ? body.ar : body.en}
          </p>
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
              {isArabic ? description.ar : description.en}
            </p>
          </div>
        )}
      </div>

      <div className="flex w-full items-center px-5 py-2 gap-4">
        <button
          onClick={ondelete}
          className="flex items-center justify-center w-[30px] h-[30px] bg-red-100 p-1 rounded-full"
        >
          <img src="/images/redtrash.png" width={14} alt="trash" />
        </button>
        <Link
          href={`/admin/dashboard/blogs/${id}`}
          className="flex items-center justify-center w-[30px] h-[30px] bg-blue-100 p-1 rounded-full"
        >
          <img src="/images/eye.png" width={14} alt="eye" />
        </Link>
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
