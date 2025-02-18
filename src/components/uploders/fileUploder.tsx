import { useState } from "react";
interface FileUploaderProps {
  label?: string;
}
export default function FileUploader({ label }: FileUploaderProps) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
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
          accept=".pdf"
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
}
