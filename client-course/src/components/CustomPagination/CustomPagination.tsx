import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Shadcn pagination

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let visiblePages = [];

    if (currentPage === 1) {
      visiblePages = [1,2];
    } else if (currentPage === totalPages) {
      visiblePages = [totalPages - 1, totalPages];
    } else {
        visiblePages = [currentPage, currentPage + 1];
        if (currentPage === totalPages - 1){
            visiblePages = [currentPage, totalPages];
        } else if (currentPage === 2){
            visiblePages = [currentPage -1, currentPage];
        }
    }
    return visiblePages.filter(page => page >= 1 && page <= totalPages);
  };

  const visiblePages = getVisiblePages();
  
  return (
    <Pagination className="mt-4 justify-center">
      <PaginationPrevious
        onClick={() => onPageChange(currentPage - 1)}
        aria-disabled={currentPage === 1}
      />
      <PaginationContent>
        {visiblePages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        { (
          <PaginationItem key="more">
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>{totalPages}</PaginationItem>
        {/* Reusable Pagination Component */}
      </PaginationContent>

      {currentPage < totalPages ? (
        <PaginationNext
          onClick={() => onPageChange(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
        />
      ) : (
        <PaginationNext />
      )}
    </Pagination>
  );
};

export default CustomPagination;