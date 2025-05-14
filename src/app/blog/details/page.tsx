"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BlogUser } from "@/Types/adminTypes";
import Footer from "@/components/footer";
import Navbar from "@/components/NavBar/navbar";

export default function Blog() {
  const [blog, setBlog] = useState<BlogUser | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const storedBlog = localStorage.getItem("blog");
    if (storedBlog) {
      setBlog(JSON.parse(storedBlog));
    }
  }, []);

  if (!blog) {
    return <p className="text-center mt-10">جاري تحميل المقال...</p>;
  }

  const { image, title, description, body = "", images = [] } = blog;

  // توزيع النص على الصور إذا وُجدت
  const textParts = images.length ? splitText(body, images.length) : [];
  const remainingText = images.length
    ? textParts.length > images.length
      ? textParts.slice(images.length).join(" ")
      : ""
    : body;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-[40px] px-4 w-full">
        {/* صورة الغلاف */}
        <div className="w-full h-[300px] overflow-hidden mb-6">
          {image ? (
            <img
              src={image}
              alt="blog"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-center">{t("no_image")}</p>
          )}
        </div>

        {/* عنوان ووصف */}
        <div className="w-full max-w-5xl mb-6 text-center md:text-start">
          <h1 className="text-2xl font-bold text-text_title mb-2">{title}</h1>
          <h2 className="text-lg text-text_des">{description}</h2>
        </div>

        {/* محتوى المقال */}
        <div className="w-full max-w-5xl flex flex-col gap-6">
          {/* حالة وجود صور */}
          {images.length > 0 &&
            images.map((img, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row ${
                  idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                } gap-4 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={img.image}
                    alt={`blog-${idx}`}
                    className="w-full h-[250px] object-cover rounded shadow"
                  />
                </div>
                <div className="w-full md:w-1/2 text-justify text-lg">
                  {textParts[idx] || ""}
                </div>
              </div>
            ))}

          {/* النص المتبقي إذا كان هناك صور + نص زائد */}
          {images.length > 0 && remainingText && (
            <div className="mt-6 text-lg text-justify">{remainingText}</div>
          )}

          {/* حالة وجود نص فقط بدون صور */}
          {images.length === 0 && body && (
            <div className="text-lg text-justify mt-4">{body}</div>
          )}

          {/* صور بدون نص (في حال الصور > النصوص) */}
          {images.length > textParts.length &&
            images.slice(textParts.length).map((extraImg, idx) => (
              <div key={`extra-img-${idx}`} className="w-full">
                <img
                  src={extraImg.image}
                  alt={`extra-${idx}`}
                  className="w-full object-cover rounded shadow"
                />
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

// دالة تقسيم النص بالتساوي حسب عدد الصور
function splitText(text: string, parts: number): string[] {
  if (!text || parts <= 0) return [text];
  const sentences = text.split(/(?<=[.!؟\n])/); // تقسيم على حسب نهاية الجمل
  const chunkSize = Math.ceil(sentences.length / parts);
  const result: string[] = [];

  for (let i = 0; i < parts; i++) {
    const chunk = sentences.slice(i * chunkSize, (i + 1) * chunkSize).join(" ");
    result.push(chunk.trim());
  }

  return result;
}
