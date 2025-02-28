"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { Service } from "@/Types/adminTypes";
import { RootState } from "@/store/store";
import "../services/style.css";
import { Box, Modal } from "@mui/material";
import TitleBar from "@/components/DashboardComponernt/titleBar";
import { useLanguage } from "@/app/context/LanguageContext";
import ServiceBlogForm from "../../components/forms/service+blogForm";
import {
  deleteService,
  fetchServicesSuccess,
} from "@/store/Reducers/servicesReducer";
import InfoCard from "@/components/cards/info_card";
import Loader from "../../components/loadingPage";

export default function Services() {
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [body, setBody] = useState({ en: "", ar: "" });
  const [image, setImage] = useState("");
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const services = useSelector(
    (state: RootState) => state.services.servicesList
  );
  const lastUpdated = useSelector(
    (state: RootState) => state.services.lastUpdated
  );

  // ✅ تحديد مدة صلاحية البيانات قبل إعادة الجلب (5 دقائق)
  const shouldFetch = () => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 دقائق بالميلي ثانية
    return now - lastUpdated > fiveMinutes || services.length === 0;
  };

  useEffect(() => {
    if (shouldFetch()) {
      const fetchServices = async () => {
        setLoadingPage(true);
        try {
          const response = await axiosInstance.get("/admin/services");
          dispatch(fetchServicesSuccess(response.data.data));
        } catch (error) {
          console.error("فشل جلب الخدمات", error);
        } finally {
          setLoadingPage(false);
        }
      };
      fetchServices();
    }
  }, [dispatch, lastUpdated, services.length]);

  const openModal = (service?: Service) => {
    if (service) {
      setIsEditing(true);
      setEditingService(service);
      setTitle(service.title);
      setBody(service.body);

      // ✅ استخراج اسم الصورة فقط بدلاً من الرابط الكامل
      const imageName = service.image?.split("/").pop() || "";
      setImage(imageName);

      setDescription(service.description);
    } else {
      setIsEditing(false);
      setEditingService(null);
      setTitle({ en: "", ar: "" });
      setBody({ en: "", ar: "" });
      setImage("");
      setDescription({ en: "", ar: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("الرجاء رفع صورة قبل إرسال النموذج");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: JSON.stringify(title),
        body: JSON.stringify(body),
        image,
        description: JSON.stringify(description),
      };

      if (isEditing && editingService) {
        const response = await axiosInstance.put(
          `/admin/services/${editingService.id}`,
          payload
        );
        const updatedService = {
          ...editingService,
          title,
          body,
          image: response.data.data.image, // تحديث الصورة الجديدة
          description,
        };
        const updatedServices = services.map((service: Service) =>
          service.id === updatedService.id ? updatedService : service
        );
        dispatch(fetchServicesSuccess(updatedServices));
        setEditingService(updatedService);
        setImage(response.data.data.image);
      } else {
        const response = await axiosInstance.post("/admin/services", payload);
        const newServices = {
          ...response.data,
          title,
          body,
          image,
          description,
        };

        dispatch(fetchServicesSuccess([...services, newServices]));
      }

      closeModal();
    } catch (error) {
      alert("فشل العملية، يرجى المحاولة لاحقاً.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/admin/services/${id}`);
      dispatch(deleteService(id));
      const updatedServices = services.filter(
        (service: Service) => service.id !== id
      );
      dispatch(fetchServicesSuccess(updatedServices));
    } catch (error) {
      console.error("فشل حذف المقال", error);
    }
  };

  return (
    <div className="flex flex-col gap-[30px] items-center">
      <TitleBar
        title={t("Services")}
        btnLabel={"+" + " " + t("Add_New_ٍService")}
        onClick={() => {
          openModal();
          setIsNew(true);
        }}
      />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="flex items-center justify-center"
      >
        <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, width: 500 }}>
          <h3>{isEditing ? "تعديل الخدمة" : "إضافة خدمة جديدة"}</h3>
          <ServiceBlogForm
            handleSubmit={handleSubmit}
            formData={{
              title,
              body,
              description,
              image,
            }}
            isNew={isNew}
            loading={loading}
            onClose={closeModal}
            onChange={(updatedForm) => {
              console.log("بيانات النموذج قبل التحديث:", updatedForm); // ✅ التحقق من القيم
              setTitle(updatedForm.title);
              setBody(updatedForm.body);
              setDescription(updatedForm.description);
              setImage(updatedForm.image ?? "");
            }}
          />
        </Box>
      </Modal>
      <div className="mt-5 w-full">
        <div className="mt-5 flex flex-wrap gap-4 w-full">
          {loadingPage ? (
            <div className="w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            services.map((service: Service) => (
              <InfoCard
                className="bg-secondary1"
                key={service.id}
                title={service.title}
                body={service.body}
                des={service.description}
                image={service.image}
                width="250"
                height="250"
                ondelete={() => handleDelete(service.id)}
                onedit={() => {
                  openModal(service);
                  setIsNew(false);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
