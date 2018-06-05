import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ total, page, limit }) => {
  const totalPages = Math.ceil(total / limit);
  return (
    <div className="pagination">
      <div className="pagination__prev">
        {page !== 1 ? (
          <Link to={`/sauces/?page=${page - 1}&limit=${limit}`}>Prev</Link>
        ) : (
          ""
        )}
      </div>
      <div className="pagination__text">{`Page ${page} of ${totalPages}`}</div>
      <div className="pagination__next">
        {page !== totalPages ? (
          <Link to={`/sauces/?page=${page + 1}&limit=${limit}`}>Next</Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Pagination;
