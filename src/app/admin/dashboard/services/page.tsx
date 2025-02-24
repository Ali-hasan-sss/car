"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { Service } from "@/Types/servicesTypes";
import UploadFile from "@/components/uploders/Uploader/UploadFile";
import { fetchServicesSuccess } from "@/store/Reducers/servicesReducer";
import { RootState } from "@/store/store"; // استيراد RootState للوصول إلى المخزن
import "./style.css";

export default function AddServiceForm() {
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [body, setBody] = useState({ en: "", ar: "" });
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const services = useSelector(
    (state: RootState) => state.services.servicesList
  ); // جلب قائمة الخدمات من المخزن

  // ✅ جلب الخدمات عند تحميل المكون
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get("/admin/services");
        dispatch(fetchServicesSuccess(response.data.data));
      } catch (error) {
        console.error("فشل جلب الخدمات", error);
      }
    };
    fetchServices();
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("الرجاء رفع صورة قبل إرسال النموذج");
      return;
    }

    try {
      setLoading(true);

      const newService: Service = {
        id: Math.floor(Math.random() * 10000),
        title,
        body,
        image,
        description,
      };

      const payload = {
        title: JSON.stringify(newService.title),
        body: JSON.stringify(newService.body),
        image: newService.image,
        description: JSON.stringify(newService.description),
      };

      await axiosInstance.post("/admin/services", payload);

      // ✅ تحديث قائمة الخدمات بعد الإضافة
      dispatch(fetchServicesSuccess([...services, newService]));

      // ✅ إعادة تعيين الحقول
      setTitle({ en: "", ar: "" });
      setBody({ en: "", ar: "" });
      setDescription({ en: "", ar: "" });
      setImage(null);
    } catch (error) {
      alert("فشل إضافة الخدمة، يرجى المحاولة لاحقاً.");
      console.error(error);
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
        <div className="flex flex-col">
          <label className="text-text_des">العنوان (عربي)</label>
          <input
            className="p-1 w-full"
            type="text"
            value={title.ar}
            onChange={(e) => setTitle({ ...title, ar: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-text_des">العنوان (إنجليزي)</label>
          <input
            className="p-1 w-full"
            type="text"
            value={title.en}
            onChange={(e) => setTitle({ ...title, en: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-text_des">الوصف (عربي)</label>
          <textarea
            className="p-1 w-full"
            value={body.ar}
            onChange={(e) => setBody({ ...body, ar: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-text_des">الوصف (إنجليزي)</label>
          <textarea
            className="p-1 w-full"
            value={body.en}
            onChange={(e) => setBody({ ...body, en: e.target.value })}
            required
          />
        </div>

        {/* مكون رفع الملف */}
        <UploadFile onFileUpload={handleFileUpload} />

        <div className="flex flex-col">
          <label className="text-text_des">الوصف الإضافي (عربي)</label>
          <textarea
            className="p-1 w-full"
            value={description.ar}
            onChange={(e) =>
              setDescription({ ...description, ar: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
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

      {/* عرض قائمة الخدمات بعد الإضافة */}
      <div className="mt-5 w-full">
        <h3>قائمة الخدمات:</h3>
        <ul>
          {services.map((service) => (
            <li key={service.id} className="border p-2 my-2">
              <strong>{service.title.ar}</strong> - {service.body.ar}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
