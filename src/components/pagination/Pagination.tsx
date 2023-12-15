import React, { useEffect } from 'react';
import main from '../main/main.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  useEffect(() => {
    onPageChange(-5);
  }, []);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const visiblePages = 3;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <span key={1} onClick={() => onPageChange(1)}>
          1
        </span>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsisStart">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={i === currentPage ? main.active : ''}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsisEnd">...</span>);
      }
      pageNumbers.push(
        <span key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={main.main__pagination}>
      <span
        className={`${currentPage === 1 ? main.disabled : ''} ${main.arrow_left}`}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        &lt;- prev
      </span>
      <div className={main.pageNumbersContainer}>
        {renderPageNumbers()}
      </div>
      <span
        className={`${currentPage === totalPages ? main.disabled : ''} ${main.arrow_right}`}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        next -&gt;
      </span>
    </div>
  );
};

export default Pagination;
