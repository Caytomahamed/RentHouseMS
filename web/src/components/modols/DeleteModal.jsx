// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import OverlayModal from '../OverlayModal';
import CustomButton from '../Custom/CustomButton.jsx';

const DeleteModal = ({
  isDelete,
  onClose,
  onDelete,
  onModalRef,
  table,
  type = 'delete',
  pragraphe = 'Are you sure you want to delete this cabins permanently? This action cannot be undone.',
  title = `Delete a ${table}`.slice(0, -1),
}) => {
  return (
    <>
      {isDelete && (
        <OverlayModal close={onClose} modalRef={onModalRef} width={35}>
          <h1 className="overlaymodal-delete">{title}</h1>
          <p className="overlaymodal-delete-p">{pragraphe}</p>

          <div className="custom-input-container">
            <label className="custom-label"></label>
            <div className="custom-input-box"></div>

            <div className="input-error-box">
              <CustomButton label="Cancle" color="white" onClick={onClose} />
              <span style={{ padding: '.7rem' }}></span>
              <CustomButton label={type} color="red" onClick={onDelete} />
            </div>
          </div>
        </OverlayModal>
      )}
    </>
  );
};

DeleteModal.propTypes = {
  isDelete: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModalRef: PropTypes.func.isRequired,
  table: PropTypes.string.isRequired,
  type: PropTypes.string,
  pragraphe: PropTypes.string,
  title: PropTypes.string,
};

export default DeleteModal;
