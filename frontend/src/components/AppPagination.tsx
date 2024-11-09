import React from "react";

interface AppPaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
}

const AppPagination: React.FC<AppPaginationProps> = ({
  currentPage,
  pageCount,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-4 items-center w-full bg-slate-50 py-2 text-sm">
      {/* Previous button */}
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-gray-300 text-gray-800 p-2 rounded disabled:opacity-50 flex items-center justify-center"
      >
        <span
          className="material-symbols-outlined leading-none text-center "
          style={{ fontSize: "12px" }}
        >
          arrow_back_ios_new
        </span>
      </button>

      {/* Page indicator */}
      <span>
        Page {currentPage} of {pageCount}
      </span>

      {/* Next button */}
      <button
        disabled={currentPage >= pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-gray-300 text-gray-800 p-2 rounded disabled:opacity-50 flex items-center justify-center"
      >
        <span
          className="material-symbols-outlined leading-none text-center"
          style={{ fontSize: "12px" }}
        >
          arrow_forward_ios
        </span>
      </button>

      {/* Rows per page dropdown */}
      <select
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        className="ml-4 px-4 py-2 border rounded"
      >
        <option value={2}>2 rows</option>
        <option value={5}>5 rows</option>
        <option value={10}>10 rows</option>
        <option value={15}>15 rows</option>
      </select>
    </div>
  );
};

export default AppPagination;
