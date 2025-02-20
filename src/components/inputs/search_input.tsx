import { useLanguage } from "@/app/context/LanguageContext";
import React from "react";
import { FaSearch } from "react-icons/fa";

interface Search_inputProps {
  value?: string;
  isExpand?: boolean;
  placeholder?: string;
}

const Search_input: React.FC<Search_inputProps> = ({
  value,
  isExpand,
  placeholder,
}) => {
  const { isArabic } = useLanguage();
  return (
    <div
      className={`search-input p-3 bg-white relative ${
        isExpand ? "w-[40px]" : "w-full"
      } `}
    >
      <input
        type="text"
        placeholder={placeholder}
        id="search"
        value={value}
        className="w-full border rounded border-gray-400 p-1 px-4"
      />
      <FaSearch
        className={`absolute top-7  cursor-pointer ${
          isArabic ? "left-8" : "right-8"
        }`}
      />
    </div>
  );
};

export default Search_input;
