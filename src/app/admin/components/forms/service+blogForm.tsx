import UploadFile from "@/components/uploders/Uploader/UploadFile";
import { useEffect, useState } from "react";

interface FormProps {
  handleSubmit: () => Promise<void>;
  onClose?: () => void;
  formData: {
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string | null;
  };
  isNew: boolean;
  loading: boolean;
  onChange?: (values: {
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string | null;
  }) => void;
}

export default function ServiceBlogForm({
  handleSubmit,
  onClose,
  isNew,
  loading,
  formData,
}: FormProps) {
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [body, setBody] = useState({ en: "", ar: "" });
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState({ en: "", ar: "" });

  // تحديث البيانات عند تحميل `formData` لأول مرة أو عند تغييره
  useEffect(() => {
    if (formData) {
      setTitle(formData.title || { en: "", ar: "" });
      setBody(formData.body || { en: "", ar: "" });
      setDescription(formData.description || { en: "", ar: "" });
      setImage(formData.image || null);
      console.log(image);
    }
  }, [formData]);

  // تمرير القيم إلى `handleSubmit` عند الضغط على الزر
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3 justify-between w-full">
        <input
          type="text"
          placeholder="العنوان (عربي)"
          value={title.ar}
          onChange={(e) => setTitle({ ...title, ar: e.target.value })}
          required
          className="w-1/2 rounded p-1"
        />
        <input
          type="text"
          placeholder="العنوان (إنجليزي)"
          value={title.en}
          onChange={(e) => setTitle({ ...title, en: e.target.value })}
          required
          className="w-1/2 rounded p-1"
        />
      </div>

      <div className="flex items-center gap-3 justify-between w-full">
        <textarea
          placeholder="النص (عربي)"
          value={body.ar}
          onChange={(e) => setBody({ ...body, ar: e.target.value })}
          required
          className="w-1/2 rounded p-1"
        />
        <textarea
          placeholder="النص (إنجليزي)"
          value={body.en}
          onChange={(e) => setBody({ ...body, en: e.target.value })}
          required
          className="w-1/2 rounded p-1"
        />
      </div>

      <div className="flex items-center gap-3 justify-between w-full">
        <textarea
          placeholder="الوصف (عربي)"
          value={description.ar}
          onChange={(e) =>
            setDescription({ ...description, ar: e.target.value })
          }
          required
          className="w-1/2 rounded p-1"
        />
        <textarea
          placeholder="الوصف (إنجليزي)"
          value={description.en}
          onChange={(e) =>
            setDescription({ ...description, en: e.target.value })
          }
          required
          className="w-1/2 rounded p-1"
        />
      </div>

      <UploadFile onFileUpload={setImage} label="اضف صورة" />
      <div className="flex items-center justify-between px-5">
        <button
          className=" w-[100px] h-[30px] rounded bg-red-400 hover:bg-red-500 "
          onClick={onClose}
        >
          الغاء
        </button>
        <button
          type="submit"
          className="button_outline h-[30px] w-[100px]"
          onClick={handleSubmit}
        >
          {loading
            ? "جاري الحفظ..."
            : isNew
            ? "إضافة المقالة"
            : "حفظ التعديلات"}
        </button>
      </div>
    </form>
  );
}
