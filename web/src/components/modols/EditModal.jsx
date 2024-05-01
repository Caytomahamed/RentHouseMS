// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import OverlayModal from '../OverlayModal';
import CustomInput from '../Custom/CustomInput.jsx';
import CustomButton from '../Custom/CustomButton.jsx';
import ToggleSwitch from '../Custom/ToggleSwitch.jsx';
const EditModal = ({
  isEdit,
  info,
  onInfoSet,
  onCloseEditModal,
  handleSubmitUpdate,
  onToggle,
  onModalRef,
  inputFields,
  modalWidth,
  table,
}) => {
  // Function to handle file input change
  const handleFileChange = (event, props) => {
    const files = event.target.files;
    onInfoSet({ ...info, [props]: files });
  };

  const image = {
    imageUrl: 'Profile Image',
    carImg: 'Car image/Pic',
    imageUrls: 'Proper Images',
  };
  return (
    <>
      {isEdit && (
        <OverlayModal
          close={onCloseEditModal}
          modalRef={onModalRef}
          width={modalWidth}
        >
          <div className="edit-modal-content">
            {inputFields.map((field) => (
              <>
                {field.name !== 'imageUrls' && field.name !== 'description' && (
                  <CustomInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={
                      field.name === 'driverType' && info[field.name] === null
                        ? 'normal'
                        : info[field.name]
                    }
                    validationRules={field.validationRules}
                    onChange={(value) =>
                      onInfoSet({ ...info, [field.name]: value })
                    }
                  />
                )}

                {field.name === 'description' && (
                  <div style={{ display: 'flex', marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Description:</label>
                    <textarea
                      value={info[field.name]}
                      onChange={(event) =>
                        onInfoSet({ ...info, [field.name]: event.target.value })
                      }
                      style={{
                        marginLeft: '17.5rem',
                        borderColor: '#ccc',
                        width: '25.5rem',
                        height: '14rem',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        padding: '1rem',
                        overflow: 'auto',
                        resize: 'text',
                      }}
                    />
                  </div>
                )}

                {field.name === 'imageUrls' && (
                  <div style={{ display: 'flex', marginBottom: '1rem' }}>
                    <label style={{ fontWeight: 'bold' }}>
                      {image[field.name]}:
                    </label>
                    <input
                      name="imageUrls"
                      onChange={(e) => handleFileChange(e, field.name)}
                      type="file"
                      multiple
                      style={{ marginLeft: '15.5rem', borderColor: '#ccc' }}
                    />
                  </div>
                )}
              </>
            ))}
            {table === 'students' && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                  IsActive:
                </label>
                <ToggleSwitch onChange={onToggle} checked={info.isActive} />
              </div>
            )}
            <div className="custom-input-container">
              <label className="custom-label"></label>
              <div className="custom-input-box"></div>

              <div className="input-error-box">
                <CustomButton
                  label="Cancle"
                  color="white"
                  onClick={onCloseEditModal}
                />
                <span style={{ padding: '.7rem' }}></span>
                <CustomButton
                  label="edit"
                  color="#4f46e5"
                  onClick={handleSubmitUpdate}
                />
              </div>
            </div>
          </div>
        </OverlayModal>
      )}
    </>
  );
};

EditModal.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  info: PropTypes.object.isRequired,
  isToggled: PropTypes.bool.isRequired,
  onInfoSet: PropTypes.func.isRequired,
  onCloseEditModal: PropTypes.func.isRequired,
  handleSubmitUpdate: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onModalRef: PropTypes.object.isRequired,
  inputFields: PropTypes.array.isRequired,
  modalWidth: PropTypes.number.isRequired,
  table: PropTypes.string.isRequired,
};

export default EditModal;
