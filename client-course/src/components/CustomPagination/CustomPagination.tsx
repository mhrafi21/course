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


  return (
    <Pagination className="mt-4 justify-center">
      <PaginationPrevious
        onClick={() => onPageChange(currentPage - 1)}
        aria-disabled={currentPage === 1}
      />
      <PaginationContent>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}
      </PaginationContent>

      {
        currentPage < totalPages ?       <PaginationNext
        onClick={() => onPageChange(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
      /> :
      <PaginationNext/>
      }
      

    </Pagination>
  );
};

export default CustomPagination;
