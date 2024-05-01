// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

function FilterModal({
  isFilter,
  modalRef,
  onFilter,
  data,
  filterStore,
  columns,
}) {
  return (
    <>
      {isFilter && (
        <div className="modal-container" ref={modalRef}>
          <h1>Filter list</h1>
          {data.map((filter, index) => (
            <select
              id="selectsFilter"
              value={filterStore}
              onChange={(e) => onFilter(e.target.value, columns[index])}
              key={index}
            >
              <option value="" selected>
                Filter by {columns[index]}
              </option>
              {filter.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </>
  );
}

FilterModal.propTypes = {
  modalRef: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterStore: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFilter: PropTypes.bool.isRequired,
};
export default FilterModal;
