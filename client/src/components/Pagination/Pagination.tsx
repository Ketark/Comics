import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaginationPropsType } from "../../types";
import './Pagination.css'

export default function Pagination({ currentPage, pages } : PaginationPropsType) {
  const navigate = useNavigate();
  const location = useLocation();
  const paginate = (pageNumber: number) => {
    navigate(`${location.pathname}?page=${pageNumber}`);
  };

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(pages, currentPage + 2);
  const pageNumbers = [];

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push('...');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < pages) {
    if (endPage < pages - 1) {
      pageNumbers.push('...');
    }
    pageNumbers.push(pages);
  }
  return (
    <nav>
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button onClick={() => paginate(currentPage - 1)} className="page-link">
              🡄
            </button>
          </li>
        )}
        {pageNumbers.map((el, index) =>
          typeof el !== "number" ? (
            <li key={`box-${index}`} className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          ) : (
            <li
              key={el}
              className={`page-item ${currentPage === el ? "active" : ""}`}
            >
              <button onClick={() => paginate(el)} className="page-link">
                {el}
              </button>
            </li>
          )
        )}
        {currentPage < pages && (
          <li className="page-item">
            <button onClick={() => paginate(currentPage + 1)} className="page-link">
              🡆
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
