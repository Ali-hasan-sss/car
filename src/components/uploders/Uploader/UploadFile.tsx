"use client";
import React, { useState, useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { uploadFileSuccess } from "@/store/Reducers/fileUploadReducer";
import { Edit, Loader2 } from "lucide-react";

interface UploadFileProps {
  onFileUpload: (fileUrl: string) => void;
  label?: string;
  transparentMode?: boolean;
}

const UploadFile: React.FC<UploadFileProps> = ({
  onFileUpload,
  label,
  transparentMode = false,
}) => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        uploadFile(selectedFile);
      }
    }
  };

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col w-full relative">
      {!transparentMode && label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {transparentMode ? (
        <div className="absolute bottom-2 left-1 z-20">
          {loading ? (
            <Loader2 className="animate-spin text-yellow-500" />
          ) : (
            <button
              type="button"
              onClick={triggerFileInput}
              disabled={loading}
              className=" p-2 w-10 h-10 rounded-full shadow hover:scale-105 transition"
            >
              <Edit className="text-yellow-500" />{" "}
            </button>
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
        </div>
      ) : (
        // ✅ الوضع العادي
        <div className="relative mt-2">
          <input
            type="file"
            onChange={handleFileChange}
            disabled={loading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
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
      )}
    </div>
  );
};

export default UploadFile;
