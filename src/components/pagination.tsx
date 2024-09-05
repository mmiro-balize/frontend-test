"use client";

interface PaginationProps {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export default function Pagination({
  currentPage,
  hasPrevious,
  hasNext,
}: PaginationProps) {
  const handleNavigation = (newPage: number) => {
    window.location.href = `?page=${newPage}`;
  };

  return (
    <div className="mt-4 flex gap-4">
      {hasPrevious && (
        <button
          onClick={() => handleNavigation(currentPage - 1)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Previous
        </button>
      )}
      {hasNext && (
        <button
          onClick={() => handleNavigation(currentPage + 1)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Next
        </button>
      )}
    </div>
  );
}
