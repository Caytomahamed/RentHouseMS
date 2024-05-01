// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemPerPage,
  dataLength,
  startIndex,
  endIndex,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const prevButton =
    currentPage > 1 ? (
      <button
        className="pagination__prev"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {` < Previous`}
      </button>
    ) : (
      <button className="pagination__prev-disable" disabled>
        {` < Previous`}
      </button>
    );

  const nextButton =
    currentPage < totalPages ? (
      <button
        className="pagination__next"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {`Next > `}
      </button>
    ) : (
      <button className="pagination__next-disable" disabled>
        {`Next > `}
      </button>
    );

  return (
    <div className="pagination">
      <div className="showing-result">
        <p>
          Showing <span id="show-page">{startIndex + 1}</span> to
          <span id="show-page"> {endIndex}</span> of
          <span id="show-page"> {dataLength}</span> results
        </p>
      </div>

      {/* <Pagination /> */}
      <div className="pagination__con">
        {prevButton}
        <p>
          {currentPage}
          <span style={{ fontSize: '1.2rem', color: 'gray' }}>
            /{totalPages}
          </span>
        </p>
        {nextButton}
      </div>

      <div className="showiteminpage">
        <h1>Show items in one page</h1>
        <select id="items" onChange={onItemPerPage} value={itemsPerPage}>
          {Array.from({ length: 100 }, (_, i) => i + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemPerPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  dataLength: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
};

export default TablePagination;
