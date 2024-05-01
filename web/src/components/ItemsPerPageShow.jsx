// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUsers,
  setCurrentPage,
  setItemsPerPage,
} from '../store/slices/userSlice';

// eslint-disable-next-line react/prop-types
function ItemsPerPageShow() {
  const dispatch = useDispatch();

  const { itemsPerPage } = useSelector(selectUsers);
  const handleChange = (event) => {
    dispatch(setItemsPerPage(parseInt(event.target.value)));
    dispatch(setCurrentPage(1));
  };

  return (
    <>
      <select id="items" onChange={handleChange} value={itemsPerPage}>
        {Array.from({ length: 100 }, (_, i) => i + 1).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}

export default ItemsPerPageShow;
