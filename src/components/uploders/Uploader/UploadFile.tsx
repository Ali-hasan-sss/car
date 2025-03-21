"use client";
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { uploadFileSuccess } from "@/store/Reducers/fileUploadReducer";

interface UploadFileProps {
  onFileUpload: (fileUrl: string) => void;
  label?: string;
}

const UploadFile: React.FC<UploadFileProps> = ({ onFileUpload, label }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false); // ✅ تتبع حالة التحميل
  const dispatch = useDispatch();

  const uploadFile = async (file: File) => {
    setLoading(true); // ✅ تشغيل اللودر عند بدء التحميل
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post("uploadFile", formData);

      const uploadedFileName = response.data?.data?.fileName;
      if (!uploadedFileName) {
        console.error("لم يتم العثور على اسم الملف في الاستجابة.");
        return;
      }

      setFileName(uploadedFileName);
      dispatch(uploadFileSuccess(uploadedFileName));
      onFileUpload(uploadedFileName);
    } catch (error) {
      console.error("فشل رفع الملف", error);
    } finally {
      setLoading(false); // ✅ إيقاف اللودر عند انتهاء العملية
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log(file);
      if (selectedFile) {
        uploadFile(selectedFile);
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative mt-2">
        <input
          type="file"
          onChange={handleFileChange}
          disabled={loading} // ✅ تعطيل الإدخال أثناء التحميل
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className={`flex items-center justify-between w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : "text-gray-400"
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></span>
              <span>جاري الرفع...</span>
            </div>
          ) : (
            fileName || "Browse"
          )}
          <img src="/images/upload.png" className="w-[15px]" alt="upload" />
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
