import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagesPerGroup = 5;
  //  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      handlePageChange(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      handlePageChange(prevPage);
    }
  };

  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav
      className="flex w-full items-center mt-3 justify-end flex-wrap"
      aria-label="Page navigation"
    >
      {/* زر السابق */}
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-secondary1 border border-gray-300 rounded-s-lg hover:bg-primary1 hover:text-white disabled:bg-gray-100 disabled:text-gray-200"
      >
        <svg
          className="w-3 h-3 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>

      {/* أرقام الصفحات */}
      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`flex items-center justify-center px-3 h-10 leading-tight border border-gray-300 
            ${
              pageNum === currentPage
                ? "bg-primary1 text-white font-bold"
                : "bg-secondary1 text-text_title hover:bg-primary1"
            }`}
        >
          {pageNum}
        </button>
      ))}

      {/* إذا بقي صفحات بعد المجموعة الحالية نعرض ... والصفحة الأخيرة */}
      {endPage < totalPages && (
        <>
          <span className="px-2 text-gray-500">...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`flex items-center justify-center px-3 h-10 leading-tight border border-gray-300 
              ${
                currentPage === totalPages
                  ? "bg-primary1 text-white font-bold"
                  : "bg-secondary1 text-text_title hover:bg-primary1"
              }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* زر التالي */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-secondary1 border border-gray-300 rounded-e-lg hover:bg-primary1 hover:text-white  disabled:bg-gray-100 disabled:text-gray-200"
      >
        <svg
          className="w-3 h-3 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </nav>
  );
}
