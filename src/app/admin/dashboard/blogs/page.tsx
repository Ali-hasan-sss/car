"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { Blog, ServiceBlogFormProps } from "@/Types/adminTypes";
import {
  addBlog,
  deleteBlog,
  fetchBlogsSuccess,
  updateBlog,
} from "@/store/Reducers/blogsReducer";
import { RootState } from "@/store/store";
import "../services/style.css";
import TitleBar from "@/components/DashboardComponernt/titleBar";
import { useLanguage } from "@/app/context/LanguageContext";
import ServiceBlogForm from "../../../../components/adminComponents/forms/service+blogForm";
import BlogCard from "@/components/adminComponents/cards/blogCard";
import Loader from "../../../../components/loading/loadingPage";
import { toast } from "sonner";
import ComfirmMessage from "@/components/messags/deleteMessage";
import AnimatedModal from "@/components/modal/AnimatedModal";

export default function Blogs() {
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
  const [itemDeleted, setItemDeleted] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogs.blogsList);
  const lastUpdated = useSelector(
    (state: RootState) => state.blogs.lastUpdated
  );
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

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingPage(true);
      try {
        const response = await axiosInstance.get("/admin/blogs");
        dispatch(fetchBlogsSuccess(response.data.data));
      } catch (error) {
        console.error("فشل جلب المقالات", error);
      } finally {
        setLoadingPage(false);
      }
    };

    if (
      !blogs.length ||
      !lastUpdated ||
      Date.now() - new Date(lastUpdated).getTime() > 5 * 60 * 1000
    ) {
      fetchBlogs();
    }
  }, [dispatch, blogs.length, lastUpdated]);

  const openModal = (blog?: Blog) => {
    if (blog) {
      setIsEditing(true);
      setEditingBlog(blog);
      setFormData({
        title: blog.title ?? { en: "", ar: "" },
        body: blog.body ?? { en: "", ar: "" },
        description: blog.description ?? { en: "", ar: "" },
        image: blog.image ? blog.image.split("/").pop() ?? "" : "", // استخراج اسم الصورة الرئيسية فقط
        images:
          blog.images?.map((img: string) => img.split("/").pop() ?? "") || [],
      });
    } else {
      setIsEditing(false);
      setEditingBlog(null);
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

      if (isEditing && editingBlog) {
        const response = await axiosInstance.put(
          `/admin/blogs/${editingBlog.id}`,
          payload
        );

        if (response.data.success) {
          const updatedBlog = {
            ...editingBlog,
            ...formData,
            image: response.data.data?.image || editingBlog.image,
            images: response.data.data?.images?.map(
              (img: string) => img.split("/").pop() ?? ""
            ),
          };
          dispatch(updateBlog(updatedBlog));
          toast.success(t("Edit_Item"));
          setEditingBlog(updatedBlog);
        } else {
          toast.error(t("Error_Edit_Item"));
        }
      } else {
        const response = await axiosInstance.post("/admin/blogs", payload);
        if (response.data.success) {
          const newBlog = {
            ...response.data.data,
            ...formData,
            image: response.data.data?.image || "",
            images: response.data.data?.image || [],
          };
          dispatch(addBlog(newBlog));
          toast.success(t("Add_Item"));
        } else {
          toast.error(t("Error_Add_Item"));
        }
      }

      closeModal();
    } catch (error) {
      toast.error("فشل العملية، يرجى المحاولة لاحقاً.");
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
    <div className="flex gap-[30px] flex-col items-center">
      <TitleBar
        title={t("Blogs")}
        btnLabel={"+" + " " + t("Add_New_Blog")}
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
        <h3 className="py-2 text-text_title text-xl">
          {isEditing ? t("Edit_Blog") : t("Add_New_Blog")}
        </h3>
        <ServiceBlogForm
          handleSubmit={handleSubmit}
          onChange={onFormChange}
          formData={formData}
          isNew={isNew}
          loading={loading}
          onClose={closeModal}
        />
      </AnimatedModal>

      <div className="w-full">
        <div className="mt-5 flex flex-wrap items-start justify-center gap-4 w-full">
          {loadingPage ? (
            <Loader />
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                {...blog}
                ondelete={() => handleDelete(blog.id)}
                onedit={() => openModal(blog)}
              />
            ))
          ) : (
            <p>لا توجد مقالات متاحة</p>
          )}
        </div>
      </div>

      <ComfirmMessage
        API={`/admin/blogs`}
        open={isDelete}
        handleClose={() => setIsDelete(false)}
        id={itemDeleted}
        onDeleteSuccess={(id) => dispatch(deleteBlog(id))}
      />
    </div>
  );
}
