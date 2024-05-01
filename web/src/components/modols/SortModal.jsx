// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function SortModal({ isSort, modalRef, onSort, data, sortKey }) {
  return (
    <>
      {isSort && (
        <div className="modal-container" ref={modalRef}>
          <h1>Sort list</h1>
          {data.map((options, index) => (
            <select
              id="selectsSort"
              value={sortKey}
              onChange={onSort}
              key={index}
            >
              {options.map((option, index) => (
                <option
                  value={options.selected ? option.title : option.column}
                  data-sortOrder={options.sortOrder}
                  key={index}
                  // eslint-disable-next-line no-undef
                  selected={options.selected}
                >
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </>
  );
}
SortModal.propTypes = {
  modalRef: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortStore: PropTypes.string.isRequired,
  isSort: PropTypes.bool.isRequired,
};
export default SortModal;
