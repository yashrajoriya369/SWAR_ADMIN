import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => paginate(i + 1)}
          className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="pagination-btn"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
