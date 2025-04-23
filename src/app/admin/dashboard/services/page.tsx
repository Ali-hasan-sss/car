"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { Service, ServiceBlogFormProps } from "@/Types/adminTypes";
import { RootState } from "@/store/store";
import "../services/style.css";
import TitleBar from "@/components/DashboardComponernt/titleBar";
import { useLanguage } from "../../../../context/LanguageContext";
import ServiceBlogForm from "../../../../components/adminComponents/forms/service+blogForm";
import {
  addService,
  deleteService,
  fetchServicesSuccess,
  updateService,
} from "@/store/Reducers/servicesReducer";
import InfoCard from "@/components/cards/info_card";
import Loader from "../../../../components/loading/loadingPage";
import { toast } from "sonner";
import AnimatedModal from "@/components/modal/AnimatedModal";
import ComfirmMessage from "@/components/messags/deleteMessage";

export default function Services() {
  const [formData, setFormData] = useState<{
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string;
    images: string[];
  }>({
    title: { en: "", ar: "" },
    body: { en: "", ar: "" },
    description: { en: "", ar: "" },
    image: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [itemDeleted, setItemDeleted] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const services = useSelector(
    (state: RootState) => state.services.servicesList
  );
  const lastUpdated = useSelector(
    (state: RootState) => state.services.lastUpdated
  );

  const shouldFetch = () => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
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
  }, [dispatch]);
  const onFormChange = useCallback(
    (updatedData: ServiceBlogFormProps["formData"]) => {
      setFormData((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(updatedData)) {
          return { ...prev, ...updatedData };
        }
        return prev;
      });
    },
    []
  );
  const openModal = (service?: Service) => {
    if (service) {
      setIsEditing(true);
      setEditingService(service);
      setFormData({
        title: service.title ?? { en: "", ar: "" },
        body: service.body ?? { en: "", ar: "" },
        description: service.description ?? { en: "", ar: "" },
        image: service.image ? service.image.split("/").pop() ?? "" : "", // استخراج اسم الصورة الرئيسية فقط
        images:
          service.images?.map((img: string) => img.split("/").pop() ?? "") ||
          [],
      });
    } else {
      setIsEditing(false);
      setFormData({
        title: { en: "", ar: "" },
        body: { en: "", ar: "" },
        description: { en: "", ar: "" },
        image: "",
        images: [],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.image) {
      toast.warning("يجب رفع صورة رئيسية للمقال");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: JSON.stringify(formData.title),
        body: JSON.stringify(formData.body),
        image: formData.image, // إرسال الاسم فقط
        description: JSON.stringify(formData.description),
        images: formData.images.length > 0 ? formData.images : undefined, // إرسال أسماء الصور فقط
      };
      if (isEditing && editingService) {
        const response = await axiosInstance.put(
          `/admin/services/${editingService.id}`,
          payload
        );
        if (response.data.success) {
          const updatedServices = {
            ...editingService,
            ...formData,
            image: response.data.data?.image || editingService.image,
          };
          dispatch(updateService(updatedServices));
          toast.success(t("Edit_Item"));
          setEditingService(updatedServices);
        } else {
          toast.error(t("Error_Edit_Item"));
        }
      } else {
        const response = await axiosInstance.post("/admin/services", payload);
        if (response.data.success) {
          const newService = {
            ...response.data.data,
            ...formData,
            image: response.data.data?.image || "",
            images: response.data.data?.image || [],
          };
          dispatch(addService(newService));
          toast.success(t("Add_Item"));
        } else {
          toast.error(t("Error_Add_Item"));
        }
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
    setItemDeleted(id);
    setIsDelete(true);
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

      <AnimatedModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        style={{ width: "500px" }}
      >
        <h3> {isEditing ? t("Edit_Service") : t("Add_New_ٍService")}</h3>
        <ServiceBlogForm
          handleSubmit={handleSubmit}
          formData={formData}
          isNew={isNew}
          loading={loading}
          onClose={closeModal}
          onChange={onFormChange}
        />
      </AnimatedModal>
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
                width="300"
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
      <ComfirmMessage
        API={`/admin/services`}
        open={isDelete}
        handleClose={() => setIsDelete(false)}
        id={itemDeleted}
        onDeleteSuccess={(id: number) => dispatch(deleteService(id))}
      />
    </div>
  );
}
