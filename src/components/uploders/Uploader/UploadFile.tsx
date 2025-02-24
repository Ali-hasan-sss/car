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
  const dispatch = useDispatch();

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("admin/uploadFile", formData);

      setFileName(response.data.data.fileName);
      // const fileUrl = response.data.data.fileUrl;

      dispatch(uploadFileSuccess(fileName));

      onFileUpload(fileName);
    } catch (error) {
      console.error("فشل رفع الملف", error);
    }
  };

  // الدالة للتعامل مع تغيير الملف
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
    <div className="flex flex-col w-full ">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative mt-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer ">
          {fileName || "Browse"}
          <img src="/images/upload.png" className="w-[15px] " alt="ubload" />
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
