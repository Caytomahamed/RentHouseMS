/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import viewIcon from '../../assets/icons/view.svg';

// eslint-disable-next-line react/prop-types
function ActionsModal({
  openEditModal,
  openDeleteModal,
  modalRef,
  table,
  onOpenView,
}) {

  return (
    <div className="modal-crud" ref={modalRef}>
      {['bookings'].includes(table) && (
        <div className="crud-box" onClick={onOpenView}>
          <img src={viewIcon} alt="edit" />
          <p>View</p>
        </div>
      )}

      <div className="crud-box" onClick={openEditModal}>
        <img src={editIcon} alt="edit" />
        <p>Edit</p>
      </div>
      <div className="crud-box" onClick={openDeleteModal}>
        <img src={deleteIcon} alt="delete" />
        <p>delete</p>
      </div>
    </div>
  );
}

export default ActionsModal;
