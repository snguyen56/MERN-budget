import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginateTable = ({ dataPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalPosts / dataPerPage); index++) {
    pageNumbers.push(index);
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev
        onClick={() =>
          paginate(currentPage - 1 < 1 ? currentPage : currentPage - 1)
        }
      />
      {pageNumbers.map((pagenumber) => (
        <Pagination.Item
          key={pagenumber}
          active={currentPage === pagenumber ? true : false}
          onClick={() => paginate(pagenumber)}
        >
          {pagenumber}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() =>
          paginate(
            currentPage + 1 > pageNumbers.length ? currentPage : currentPage + 1
          )
        }
      />
      <Pagination.Last onClick={() => paginate(pageNumbers.length)} />
    </Pagination>
  );
};

export default PaginateTable;
