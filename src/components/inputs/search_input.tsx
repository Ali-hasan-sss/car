import React from "react";
import { FaSearch } from "react-icons/fa";

interface Search_inputProps {
  value?: string;
  isExpand?: boolean;
}

const Search_input: React.FC<Search_inputProps> = ({ value, isExpand }) => {
  return (
    <div
      className={`search-input relative ${isExpand ? "w-[40px]" : "w-full"} `}
    >
      <input type="text" id="search" value={value} className="w-full p-2" />
      <FaSearch className="absolute top-3 right-4 cursor-pointer" />
    </div>
  );
};

export default Search_input;
