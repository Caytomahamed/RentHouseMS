// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function FilterModal({ modalRef, children }) {
  return (
    <div className="modal-container" ref={modalRef}>
      <h1>Filter list</h1>
      {children}
    </div>
  );
}

export default FilterModal;
