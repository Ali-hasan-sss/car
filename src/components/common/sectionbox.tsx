// src/components/common/SectionBox.tsx
import React from "react";

interface SectionBoxProps {
  title: string;
  children: React.ReactNode;
}

const SectionBox: React.FC<SectionBoxProps> = ({ title, children }) => (
  <div className="bg-white p-4  w-full ">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <div className="w-full">{children}</div>
  </div>
);

export default SectionBox;
