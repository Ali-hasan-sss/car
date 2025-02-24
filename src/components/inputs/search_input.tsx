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
      className={`search-input p-2 bg-white relative ${
        isExpand ? "w-[40px]" : "w-full"
      } `}
    >
      <input
        type="text"
        placeholder={placeholder}
        id="search"
        value={value}
        className="w-full border rounded border-gray-400  px-4"
      />
      <FaSearch
        className={`absolute top-4  cursor-pointer ${
          isArabic ? "left-7" : "right-7"
        }`}
      />
    </div>
  );
};

export default Search_input;
