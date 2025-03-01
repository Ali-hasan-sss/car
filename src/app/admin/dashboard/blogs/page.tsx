"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { Blog } from "@/Types/adminTypes";
import {
  addBlog,
  deleteBlog,
  fetchBlogsSuccess,
  updateBlog,
} from "@/store/Reducers/blogsReducer";
import { RootState } from "@/store/store";
import "../services/style.css";
import { Box, Modal } from "@mui/material";
import TitleBar from "@/components/DashboardComponernt/titleBar";
import { useLanguage } from "@/app/context/LanguageContext";
import ServiceBlogForm from "../../components/forms/service+blogForm";
import BlogCard from "@/components/cards/adminCard/blogCard";
import Loader from "../../components/loadingPage";
import { toast } from "sonner";
import ComfirmMessage from "@/components/messags/comfirmMessage";

export default function Blogs() {
  const [formData, setFormData] = useState<Partial<Blog>>({
    title: { en: "", ar: "" },
    body: { en: "", ar: "" },
    description: { en: "", ar: "" },
    image: "",
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

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingPage(true);
      try {
        const response = await axiosInstance.get("/admin/blogs");
        dispatch(fetchBlogsSuccess(response.data.data));
      } catch (error) {
        console.error("فشل جلب الخدمات", error);
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
        title: blog.title,
        body: blog.body,
        image: blog.image ? blog.image.split("/").pop() ?? "" : "",
        description: blog.description,
      });
    } else {
      setIsEditing(false);
      setEditingBlog(null);
      setFormData({
        title: { en: "", ar: "" },
        body: { en: "", ar: "" },
        image: "",
        description: { en: "", ar: "" },
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.image) {
      toast.warning("Error_Image");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        title: JSON.stringify(formData.title),
        body: JSON.stringify(formData.body),
        image: formData.image,
        description: JSON.stringify(formData.description),
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
          };
          dispatch(updateBlog(updatedBlog));
          toast.success(t("Edit_Item"));
          setEditingBlog(updatedBlog);

          // تأخير تحديث الصورة لتجنب إعادة التهيئة الفورية
          setTimeout(() => {
            setFormData((prev) => ({ ...prev, image: updatedBlog.image }));
          }, 0);
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
          };
          dispatch(addBlog(newBlog));
          toast.success(t("Add_Item"));

          // تأخير تحديث الصورة لتجنب الخطأ
          setTimeout(() => {
            setFormData((prev) => ({ ...prev, image: newBlog.image }));
          }, 0);
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

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="flex items-center justify-center"
      >
        <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, width: 500 }}>
          <h3>{isEditing ? "تعديل المقالة" : "إضافة مقالة جديدة"}</h3>
          <ServiceBlogForm
            handleSubmit={handleSubmit}
            formData={{
              title: formData.title ?? { en: "", ar: "" },
              body: formData.body ?? { en: "", ar: "" },
              description: formData.description ?? { en: "", ar: "" },
              image: formData.image ?? "",
            }}
            isNew={isNew}
            loading={loading}
            onClose={closeModal}
            onChange={(updatedForm) => {
              setFormData((prev) => ({ ...prev, ...updatedForm }));
            }}
          />
        </Box>
      </Modal>
      <div className=" w-full">
        <div className="mt-5 flex flex-wrap items-start justify-center gap-4 w-full">
          {loadingPage ? (
            <div className="w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog: Blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                body={blog.body}
                description={blog.description}
                image={blog.image}
                ondelete={() => handleDelete(blog.id)}
                onedit={() => {
                  openModal(blog);
                  setIsNew(false);
                }}
              />
            ))
          ) : (
            <p>لا توجد مقالات متاحة</p>
          )}
        </div>
      </div>
      <ComfirmMessage
        API={`/admin/blogs/`}
        open={isDelete}
        handleClose={() => setIsDelete(false)}
        id={itemDeleted}
        onDeleteSuccess={(id) => {
          dispatch(deleteBlog(id));
        }}
      />
    </div>
  );
}
