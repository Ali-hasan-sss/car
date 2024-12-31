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
      className={`search-input relative ${isExpand ? "w-[40px]" : "w-full"} `}
    >
      <input
        type="text"
        placeholder={placeholder}
        id="search"
        value={value}
        className="w-full p-2 px-4"
      />
      <FaSearch
        className={`absolute top-3  cursor-pointer ${
          isArabic ? "left-4" : "right-4"
        }`}
      />
    </div>
  );
};

export default Search_input;
