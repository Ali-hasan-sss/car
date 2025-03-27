import React from "react";

interface PaginationProps {
  totalPages: number; // عدد الصفحات
  currentPage: number; // الصفحة الحالية
  onPageChange: (page: number) => void; // دالة لتغيير الصفحة
}

export default function CustomPagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pagesPerGroup = 5; // عدد الصفحات التي يتم عرضها في كل مجموعة
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup); // تحديد المجموعة الحالية

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const startPage = currentGroup * pagesPerGroup + 1; // الصفحة الأولى في المجموعة الحالية
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); // الصفحة الأخيرة في المجموعة
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav
      className="flex w-full items-center mt-3 justify-end flex-wrap"
      aria-label="Page navigation"
    >
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

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-secondary1 border border-gray-300 rounded-e-lg hover:bg-primary1 hover:text-white disabled:bg-gray-100 disabled:text-gray-200"
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
