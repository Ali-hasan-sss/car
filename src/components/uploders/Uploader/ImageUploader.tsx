"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useDropzone } from "react-dropzone";
import { Image, Trash2 } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import LoadingBTN from "@/components/loading/loadingBTN";

const BASE_IMAGE_URL = "https://test.smarty.design/assets/img/common/";

interface ImageUploaderProps {
  onImagesUpload: (fileNames: string[]) => void;
  multiple?: boolean;
  initialImages?: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesUpload,
  multiple = true,
  initialImages = [],
}) => {
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(
        initialImages.map((name) => ({
          url: `${BASE_IMAGE_URL}${name}`,
          name,
        }))
      );
    }
  }, [initialImages]);

  const uploadImage = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("admin/uploadFile", formData);
      const uploadedFileUrl = response.data?.data?.file;
      const uploadedFileName = response.data?.data?.fileName;

      if (!uploadedFileUrl || !uploadedFileName) {
        console.error("لم يتم العثور على البيانات المطلوبة في الاستجابة.");
        return;
      }

      setImages((prev) => {
        const updatedImages = [
          ...prev,
          { url: uploadedFileUrl, name: uploadedFileName },
        ];
        onImagesUpload(updatedImages.map((img) => img.name)); // ✅ يتم استدعاء onImagesUpload مباشرة هنا
        return updatedImages;
      });
    } catch (error) {
      console.error("فشل رفع الصورة", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilesUpload = (files: File[]) => {
    files.forEach(uploadImage);
  };

  const isDisabled = !multiple && images.length >= 1;

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple,
    disabled: isDisabled,
    onDrop: handleFilesUpload,
  });

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      onImagesUpload(updatedImages.map((img) => img.name)); // ✅ يتم التحديث هنا أيضًا
      return updatedImages;
    });
  };

  return (
    <div
      className={`border-2 border-dashed border-primary1 rounded-lg bg-gray-100 w-full p-2 ${
        !multiple && images.length > 0
          ? "flex items-center gap-4"
          : "flex flex-col"
      }`}
    >
      <div
        {...getRootProps()}
        className={`flex items-center gap-2 justify-center p-2 text-center h-[65px] cursor-pointer rounded-lg transition ${
          isDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        style={{ flex: multiple || images.length === 0 ? "none" : "0 0 auto" }}
      >
        <input {...getInputProps()} disabled={isDisabled} />
        <p className="text-gray-600">
          {isDisabled ? t("not_allowed_upload_file") : t("drag_and_drop_file")}
        </p>
        <Image />
      </div>

      {images.length > 0 && (
        <div
          className={`mt-2 ${
            multiple ? "overflow-x-auto flex" : "flex items-center"
          }`}
        >
          <div className="flex gap-2 w-max">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24 flex-shrink-0">
                <img
                  src={img.url}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg shadow"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && <LoadingBTN />}
    </div>
  );
};

export default ImageUploader;
