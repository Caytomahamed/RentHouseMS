import React from 'react';
import PropTypes from 'prop-types';

import OverlayModal from '../OverlayModal';
import CustomInput from '../Custom/CustomInput.jsx';
import CustomButton from '../Custom/CustomButton.jsx';
import { toast } from 'react-toastify';

const CreateModal = ({
  isCreate,
  info,
  onInfoSet,
  onCloseCreateModal,
  onCreate,
  onModalRef,
  inputFields,
  modalWidth,
  table,
}) => {
  // Function to handle file input change
  const handleFileChange = (event, props) => {
    const files = event.target.files;
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/jpg',
    ];
    for (let i = 0; i < files.length; i++) {
      const fileType = files[i].type;
      if (!validImageTypes.includes(fileType)) {
        toast.error(`File  is not an image.`);
        return;
      }
    }
    onInfoSet({ ...info, [props]: files });
  };

  const image = {
    imageUrl: 'Profile Image',
    carImg: 'Car image/Pic',
    imageUrls: 'Proper Images',
  };

  return (
    <>
      {isCreate && (
        <OverlayModal
          close={onCloseCreateModal}
          modalRef={onModalRef}
          width={modalWidth}
        >
          <div className="edit-modal-content">
            {inputFields.map((field) => (
              <React.Fragment key={field.name}>
                {field.name !== 'imageUrls' &&
                  field.name !== 'carImg' &&
                  field.name !== 'description' && (
                    <CustomInput
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={info[field.name]}
                      onChange={(value) =>
                        onInfoSet({ ...info, [field.name]: value })
                      }
                      validationRules={field.validationRules}
                      required
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

                {(field.name === 'imageUrls' || field.name === 'carImg') && (
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
              </React.Fragment>
            ))}
            {table === 'students' && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ fontWeight: 'bold', marginRight: '1rem' }}>
                  IsActive:
                </label>
              </div>
            )}

            <div className="custom-input-container">
              <label className="custom-label"></label>
              <div className="custom-input-box"></div>

              <div className="input-error-box">
                <CustomButton
                  label="Cancel"
                  color="white"
                  onClick={onCloseCreateModal}
                />
                <span style={{ padding: '.7rem' }}></span>
                <CustomButton
                  label="Create"
                  color="#4f46e5"
                  onClick={onCreate}
                />
              </div>
            </div>
          </div>
        </OverlayModal>
      )}
    </>
  );
};

CreateModal.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  info: PropTypes.object.isRequired,
  onInfoSet: PropTypes.func.isRequired,
  onCloseCreateModal: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onModalRef: PropTypes.object.isRequired,
  inputFields: PropTypes.array.isRequired,
  modalWidth: PropTypes.number.isRequired,
  table: PropTypes.string.isRequired,
};

export default CreateModal;
