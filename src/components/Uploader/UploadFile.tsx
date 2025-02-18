"use client";
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { uploadFileSuccess } from "@/store/Reducers/fileUploadReducer";

interface UploadFileProps {
  onFileUpload: (fileUrl: string) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("admin/uploadFile", formData);

      const fileName = response.data.data.fileName;
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
    <div>
      <label>اختر الملف</label>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default UploadFile;
