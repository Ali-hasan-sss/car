"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/utils/axiosInstance";
import { Blog } from "@/Types/blogsTypes";
import {
  deleteBlog,
  fetchBlogsSuccess,
  updateBlog,
} from "@/store/Reducers/blogsReducer";
import { RootState } from "@/store/store";
import "../services/style.css";
import BlogCard from "@/components/cards/blogCard";
import { Box, Modal } from "@mui/material";
import TitleBar from "@/components/DashboardComponernt/titleBar";
import { useLanguage } from "@/app/context/LanguageContext";
import ServiceBlogForm from "../../components/forms/service+blogForm";

export default function Blogs() {
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [body, setBody] = useState({ en: "", ar: "" });
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogs.blogsList);
  const formData = {
    title: { ar: "", en: "" },
    body: { ar: "", en: "" },
    description: { ar: "", en: "" },
    image: image,
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/admin/blogs");
        dispatch(fetchBlogsSuccess(response.data.data));
      } catch (error) {
        console.error("فشل جلب المقالات", error);
      }
    };
    fetchBlogs();
  }, [dispatch]);

  const openModal = (blog?: Blog) => {
    if (blog) {
      setIsEditing(true);
      setEditingBlog(blog);
      setTitle(blog.title);
      setBody(blog.body);
      setImage(blog.image);
      setDescription(blog.description);
    } else {
      setIsEditing(false);
      setEditingBlog(null);
      setTitle({ en: "", ar: "" });
      setBody({ en: "", ar: "" });
      setImage(null);
      setDescription({ en: "", ar: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.image) {
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

      if (isEditing && editingBlog) {
        await axiosInstance.put(`/admin/blogs/${editingBlog.id}`, payload);
        dispatch(
          updateBlog({
            ...editingBlog,
            title,
            body,
            image: image || "", // إذا كانت `null` اجعلها `""`
            description,
          })
        );
      } else {
        const response = await axiosInstance.post("/admin/blogs", payload);
        dispatch(
          fetchBlogsSuccess([
            ...blogs,
            { ...response.data, title, body, image, description },
          ])
        );
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
      await axiosInstance.delete(`/admin/blogs/${id}`);
      dispatch(deleteBlog(id));
    } catch (error) {
      console.error("فشل حذف المقال", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <TitleBar
        title={t("Blogs")}
        btnLabel="+ اضافة مقالة جديدة"
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
            handleSubmit={handleSubmit} // تمرير الدالة الصحيحة
            formData={{
              title,
              body,
              description,
              image,
            }}
            isNew={isNew}
            loading={loading}
            onClose={closeModal}
            onChange={({ title, body, description, image }) => {
              setTitle(title);
              setBody(body);
              setDescription(description);
              setImage(image);
            }}
          />
        </Box>
      </Modal>
      <div className="mt-5 w-full">
        <h3>قائمة المقالات:</h3>
        <div className="mt-5 flex flex-wrap gap-4 w-full">
          {blogs.map((blog) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
