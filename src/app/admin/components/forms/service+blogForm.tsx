import UploadFile from "@/components/uploders/Uploader/UploadFile";
import { useEffect, useState } from "react";

interface FormProps {
  handleSubmit: () => Promise<void>;
  onClose?: () => void;
  formData: {
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string;
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
  onChange,
}: FormProps) {
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [body, setBody] = useState({ en: "", ar: "" });
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // تحديث القيم عند تحميل `formData`
  useEffect(() => {
    if (formData) {
      setTitle(formData.title || { en: "", ar: "" });
      setBody(formData.body || { en: "", ar: "" });
      setDescription(formData.description || { en: "", ar: "" });
      setImage(formData.image || "");
    }
  }, [formData]);

  // مراقبة تغيير `image` لتحديث حالة الزر
  useEffect(() => {
    setIsButtonDisabled(!image); // سيتم تعطيل الزر إذا كانت `image` فارغة أو null
  }, [image]);

  // تمرير القيم إلى `handleSubmit` عند الضغط على الزر
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };
  const handleFileUpload = (fileName: string) => {
    setImage(fileName);
    onChange?.({ ...formData, image: fileName });
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3 justify-between w-full">
        <input
          type="text"
          placeholder="العنوان (عربي)"
          value={title.ar}
          onChange={(e) => {
            const newTitle = { ...title, ar: e.target.value };
            setTitle(newTitle);
            onChange?.({ ...formData, title: newTitle });
          }}
          required
          className="w-1/2 rounded p-1"
        />

        <input
          type="text"
          placeholder="العنوان (إنجليزي)"
          value={title.en}
          onChange={(e) => {
            const newTitle = { ...title, en: e.target.value };
            setTitle(newTitle);
            onChange?.({ ...formData, title: newTitle });
          }}
          required
          className="w-1/2 rounded p-1"
        />
      </div>

      <div className="flex items-center gap-3 justify-between w-full">
        <textarea
          placeholder="النص (عربي)"
          value={body.ar}
          onChange={(e) => {
            const newBody = { ...body, ar: e.target.value };
            setBody(newBody);
            onChange?.({ ...formData, body: newBody });
          }}
          required
          className="w-1/2 rounded p-1"
        />
        <textarea
          placeholder="النص (إنجليزي)"
          value={body.en}
          onChange={(e) => {
            const newBody = { ...body, en: e.target.value };
            setBody(newBody);
            onChange?.({ ...formData, body: newBody });
          }}
          required
          className="w-1/2 rounded p-1"
        />
      </div>

      <div className="flex items-center gap-3 justify-between w-full">
        <textarea
          placeholder="الوصف (عربي)"
          value={description.ar}
          onChange={(e) => {
            const newDesc = { ...description, ar: e.target.value };
            setDescription(newDesc);
            onChange?.({ ...formData, description: newDesc });
          }}
          required
          className="w-1/2 rounded p-1"
        />
        <textarea
          placeholder="الوصف (إنجليزي)"
          value={description.en}
          onChange={(e) => {
            const newDesc = { ...description, en: e.target.value };
            setDescription(newDesc);
            onChange?.({ ...formData, description: newDesc });
          }}
          required
          className="w-1/2 rounded p-1"
        />
      </div>

      {/* مكون رفع الصورة */}
      <UploadFile onFileUpload={handleFileUpload} label="اضف صورة" />

      <div className="flex items-center justify-between px-5">
        <button
          className="w-[100px] h-[30px] rounded bg-red-400 hover:bg-red-500"
          onClick={onClose}
        >
          الغاء
        </button>
        <button
          type="submit"
          className={`button_outline h-[30px] w-[100px] ${
            isButtonDisabled
              ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
              : ""
          }`}
          disabled={isButtonDisabled} // ✅ تعطيل الزر بناءً على الحالة
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
