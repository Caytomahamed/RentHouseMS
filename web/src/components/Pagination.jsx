// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  selectFilteredAndSortedUsers,
  selectUsers,
  setCurrentPage,
} from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
function Pagination() {
  // Render previous and next buttons
  const dispatch = useDispatch();
  const { totalPages } = useSelector(selectFilteredAndSortedUsers);
  const { currentPage } = useSelector(selectUsers);


  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
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
      <button
        className="pagination__prev-disable"
        onClick={() => handlePageChange(currentPage - 1)}
      >
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
      <button
        className="pagination__next-disable"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {`Next > `}
      </button>
    );

  return (
    <div className="pagination__con">
      {prevButton}
      <p>
        {currentPage}
        <span style={{ fontSize: '1.2rem', color: 'gray' }}>/{totalPages}</span>
      </p>
      {nextButton}
    </div>
  );
}

export default Pagination;
