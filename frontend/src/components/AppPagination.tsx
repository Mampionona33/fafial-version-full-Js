import React from "react";

interface AppPaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const AppPagination: React.FC<AppPaginationProps> = ({
  currentPage,
  pageCount,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
      >
        Précédent
      </button>
      <span>
        Page {currentPage} sur {pageCount}
      </span>
      <button
        disabled={currentPage >= pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};

export default AppPagination;
