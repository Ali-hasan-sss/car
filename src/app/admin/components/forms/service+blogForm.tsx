import { useLanguage } from "@/app/context/LanguageContext";
import UploadFile from "@/components/uploders/Uploader/UploadFile";
import { useEffect, useState } from "react";
import LoadingBTN from "../loadingBTN";

interface ServiceBlogFormProps {
  formData: {
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string;
  };
  handleSubmit: () => void;
  isNew: boolean;
  loading: boolean;
  onClose: () => void;
  onChange: (updatedForm: {
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string;
  }) => void;
}

export default function ServiceBlogForm({
  handleSubmit,
  onClose,
  isNew,
  loading,
  formData,
  onChange,
}: ServiceBlogFormProps) {
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [body, setBody] = useState({ en: "", ar: "" });
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { t } = useLanguage();
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
        <div className="flex flex-col w-1/2">
          <label className="text-text_title">{t("title_ar")}</label>
          <input
            type="text"
            value={title.ar}
            onChange={(e) => {
              const newTitle = { ...title, ar: e.target.value };
              setTitle(newTitle);
              onChange?.({ ...formData, title: newTitle });
            }}
            required
            className="w-full rounded p-1"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-text_title">{t("title_en")}</label>
          <input
            type="text"
            value={title.en}
            onChange={(e) => {
              const newTitle = { ...title, en: e.target.value };
              setTitle(newTitle);
              onChange?.({ ...formData, title: newTitle });
            }}
            required
            className="w-full rounded p-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 justify-between w-full">
        <div className="flex flex-col w-1/2">
          <label className="text-text_title">{t("Body_ar")}</label>
          <textarea
            value={body.ar}
            onChange={(e) => {
              const newBody = { ...body, ar: e.target.value };
              setBody(newBody);
              onChange?.({ ...formData, body: newBody });
            }}
            required
            className="w-full rounded p-1"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-text_title">{t("Body_en")}</label>
          <textarea
            value={body.en}
            onChange={(e) => {
              const newBody = { ...body, en: e.target.value };
              setBody(newBody);
              onChange?.({ ...formData, body: newBody });
            }}
            required
            className="w-full rounded p-1"
          />
        </div>{" "}
      </div>

      <div className="flex items-center gap-3 justify-between w-full">
        <div className="flex flex-col w-1/2">
          <label className="text-text_title">{t("desc_ar")}</label>
          <textarea
            value={description.ar}
            onChange={(e) => {
              const newDesc = { ...description, ar: e.target.value };
              setDescription(newDesc);
              onChange?.({ ...formData, description: newDesc });
            }}
            required
            className="w-full rounded p-1"
          />
        </div>

        <div className="flex flex-col w-1/2">
          <label className="text-text_title">{t("desc_en")}</label>
          <textarea
            value={description.en}
            onChange={(e) => {
              const newDesc = { ...description, en: e.target.value };
              setDescription(newDesc);
              onChange?.({ ...formData, description: newDesc });
            }}
            required
            className="w-full rounded p-1"
          />
        </div>
      </div>

      {/* مكون رفع الصورة */}
      <UploadFile onFileUpload={handleFileUpload} label="اضف صورة" />

      <div className="flex items-center justify-between px-5">
        <button
          className="w-[100px] h-[30px] rounded bg-red-400 hover:bg-red-500"
          onClick={onClose}
        >
          {t("Close")}
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
          {loading ? <LoadingBTN /> : isNew ? t("Add") : t("Save")}
        </button>
      </div>
    </form>
  );
}
