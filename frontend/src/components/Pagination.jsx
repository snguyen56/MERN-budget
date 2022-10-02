import React from "react";

const Pagination = ({ dataPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalPosts / dataPerPage); index++) {
    pageNumbers.push(index);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pagenumber) => (
          <li key={pagenumber} className="page-item">
            <a onClick={() => paginate(pagenumber)} className="page-link">
              {pagenumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
