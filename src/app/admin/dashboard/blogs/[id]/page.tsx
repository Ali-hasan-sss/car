"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { fetchBlogsSuccess } from "@/store/Reducers/blogsReducer";
import type { Blog } from "@/Types/adminTypes";
import { toast } from "sonner";
import { useLanguage } from "@/app/context/LanguageContext";
import { Modal, Box } from "@mui/material";
import ServiceBlogForm from "@/app/admin/components/forms/service+blogForm";
import Loader from "../../../components/loadingPage";
import { EditIcon } from "lucide-react";

export default function Blog() {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [body, setBody] = useState({ en: "", ar: "" });
  const [image, setImage] = useState("");
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const { t } = useLanguage();
  const { id: paramId } = useParams();
  const id = Number(paramId);
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoadingPage(true);
        const response = await axiosInstance.get(`/admin/blogs/${id}`);
        setBlog(response.data.data);
        dispatch(fetchBlogsSuccess(response.data.data));
      } catch (error) {
        console.error("فشل جلب المقال", error);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchBlog();
  }, [id, dispatch]);

  const openModal = () => {
    if (!blog) return;
    setTitle(blog.title);
    setBody(blog.body);
    const imageName = blog.image ? blog.image.split("/").pop() ?? "" : "";
    setImage(imageName);
    setDescription(blog.description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async () => {
    if (!image) {
      toast.warning("Error_Image");
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

      const response = await axiosInstance.put(`/admin/blogs/${id}`, payload);
      const updatedBlog: Blog = {
        id, // تأكد من أن `id` موجود
        title,
        body,
        image: response.data.data.image,
        description,
      };

      if (response.data.success) {
        toast.success(t("Edit_Item"));
      } else {
        toast.error(t("Error_Edit_Item"));
      }

      setBlog(updatedBlog);

      setImage(response.data.data.image);
      closeModal();
    } catch (error) {
      toast.error("فشل العملية، يرجى المحاولة لاحقاً.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loadingPage ? (
        <div className="w-full flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col py-[40px] w-full items-center justify-center">
          <div className="w-[500px] overflow-hidden h-[300px] flex items-center justify-center">
            {blog?.image ? (
              <img
                src={blog.image}
                alt={blog.title.en}
                className="w-full object-cover"
              />
            ) : (
              <p>لا توجد صورة</p>
            )}
          </div>

          <div className="container flex items-start justify-between gap-[30px] py-[20px]">
            {!blog ? (
              <p>جاري تحميل المقال...</p>
            ) : (
              <>
                <div className="flex flex-col gap-4 w-1/2">
                  <label className="text-text_dis">المقالة بالعربي</label>
                  <div className="w-full flex flex-col gap-2 border rounded p-2 bg-secondary1">
                    <h1 className="text-text_title font-bold text-xl">
                      {blog.title.ar || "لا يوجد عنوان"}
                    </h1>
                    <hr />
                    <h2 className="text-text_des text-lg">
                      {blog.description.ar || "لا يوجد وصف"}
                    </h2>
                    <hr />
                    <p className="text-lg">{blog.body.ar || "لا يوجد محتوى"}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-1/2">
                  <label className="text-text_dis">المقالة بالإنجليزية</label>
                  <div className="w-full flex flex-col gap-2 border rounded p-2 bg-secondary1">
                    <h1 className="text-text_title font-bold text-xl">
                      {blog.title.en || "No Title"}
                    </h1>
                    <hr />
                    <h2 className="text-text_des text-lg">
                      {blog.description.en || "No Description"}
                    </h2>
                    <hr />
                    <p className="text-lg">{blog.body.en || "No Content"}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* زر فتح المودال للتعديل */}
          <div className="flex items-start gap-[20px] w-full">
            <EditIcon
              className="mr-2 text-yellow-600 hover:text-white cursor-pointer bg-yellow-200 hover:bg-yellow-400  p-2 rounded-full h-[30px] w-[30px]"
              onClick={openModal}
            />
          </div>
        </div>
      )}

      {/* مودال تعديل المقال */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="flex items-center justify-center"
      >
        <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, width: 500 }}>
          <h3 className="text-xl font-bold mb-3">تعديل المقالة</h3>
          <ServiceBlogForm
            handleSubmit={handleSubmit}
            formData={{ title, body, description, image }}
            isNew={false}
            loading={loading}
            onClose={closeModal}
            onChange={(updatedForm) => {
              setTitle(updatedForm.title);
              setBody(updatedForm.body);
              setDescription(updatedForm.description);
              setImage(updatedForm.image ?? "");
            }}
          />
        </Box>
      </Modal>
    </>
  );
}
