import React from "react";

import styles from "./Pagination.module.css";

interface PaginationProps {
  totalHeroes: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalHeroes,
  currentPage,
  onPageChange,
}) => {
  const heroesPerPage = 5;
  const totalPages = Math.ceil(totalHeroes / heroesPerPage);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={i === currentPage ? styles.active : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {`${"<"}`}
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {`${">"}`}
      </button>
    </div>
  );
};

export default Pagination;
