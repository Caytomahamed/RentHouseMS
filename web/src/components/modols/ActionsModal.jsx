// eslint-disable-next-line no-unused-vars
import React from 'react';

import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';

// eslint-disable-next-line react/prop-types
function ActionsModal({ openEditModal, openDeleteModal, modalRef }) {
  return (
    <div className="modal-crud" ref={modalRef}>
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
