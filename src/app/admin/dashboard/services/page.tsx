"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { Service } from "@/Types/servicesTypes";
import UploadFile from "@/components/Uploader/UploadFile";
import { fetchServicesSuccess } from "@/store/Reducers/servicesReducer";
import "./style.css";
export default function AddServiceForm() {
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [body, setBody] = useState({ en: "", ar: "" });
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التأكد من أنه تم رفع صورة
    if (!image) {
      console.error("الرجاء رفع صورة");
      alert("الرجاء رفع صورة قبل إرسال النموذج");
      return;
    }

    try {
      setLoading(true);

      // إنشاء الخدمة الجديدة
      const newService: Service = {
        id: Math.floor(Math.random() * 10000),
        title,
        body,
        image: image,
        description,
      };

      const payload = {
        title: JSON.stringify(newService.title),
        body: JSON.stringify(newService.body),
        image: newService.image,
        description: JSON.stringify(newService.description),
      };

      await axiosInstance.post("/admin/services", payload);
      dispatch(fetchServicesSuccess([newService]));
    } catch (error) {
      console.error("فشل إضافة الخدمة", error);
      alert("فشل إضافة الخدمة، يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (fileUrl: string) => {
    setImage(fileUrl);
  };

  return (
    <div className="flex flex-col items-center">
      <h3>إضافة خدمة جديدة</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-4 bg-white p-4"
      >
        <div className="flex flex-col ">
          <label className="text-text_des">العنوان (عربي)</label>
          <input
            className="p-1 w-full"
            type="text"
            value={title.ar}
            onChange={(e) => setTitle({ ...title, ar: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-text_des">العنوان (إنجليزي)</label>
          <input
            className="p-1 w-full"
            type="text"
            value={title.en}
            onChange={(e) => setTitle({ ...title, en: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-text_des">الوصف (عربي)</label>
          <textarea
            className="p-1 w-full"
            value={body.ar}
            onChange={(e) => setBody({ ...body, ar: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-text_des">الوصف (إنجليزي)</label>
          <textarea
            className="p-1 w-full"
            value={body.en}
            onChange={(e) => setBody({ ...body, en: e.target.value })}
            required
          />
        </div>

        {/* نقل رفع الملف إلى خارج النموذج */}
        <UploadFile onFileUpload={handleFileUpload} />

        <div className="flex flex-col ">
          <label className="text-text_des">الوصف الإضافي (عربي)</label>
          <textarea
            className="p-1 w-full"
            value={description.ar}
            onChange={(e) =>
              setDescription({ ...description, ar: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-text_des">الوصف الإضافي (إنجليزي)</label>
          <textarea
            className="p-1 w-full"
            value={description.en}
            onChange={(e) =>
              setDescription({ ...description, en: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="p-1 bg-primary1 text-white"
          disabled={loading}
        >
          {loading ? "جاري إضافة الخدمة..." : "إضافة الخدمة"}
        </button>
      </form>
    </div>
  );
}
