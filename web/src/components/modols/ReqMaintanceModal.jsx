// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import OverlayModal from '../OverlayModal';
import PropTypes from 'prop-types';
import ReqImage from '../../assets/images/reqMain.png';
import CustomDropdown from '../Custom/CustomDropdown';
import { toast } from 'react-toastify';
import CustomButton from '../Custom/CustomButton';
import { createMaintanace } from '../../store/slices/maintanceSlice';
import { useDispatch } from 'react-redux';

const ReqMaintanceModal = ({
  onCloseReqMaintanceModal,
  onModalRef,
  modalWidth,
  isCheckout,
  item,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const check = () => {
    if (selectedOption && text.length > 0) {
      'maintance',
        {
          bookingId: item.id,
          tenantId: item.tenantId,
          type: selectedOption.value,
          description: text,
        };
      dispatch(
        createMaintanace({
          bookingId: item.id,
          tenantId: item.tenantId,
          type: selectedOption.value,
          description: text,
        })
      );
      setText('');
      onCloseReqMaintanceModal();
      toast.success('Request sent successfully');
      return;
    }

    toast.error('Please select a payment method and agree to the terms');
    onCloseReqMaintanceModal();
  };

  const options = [
    { label: 'Maintaince Type', value: '' },
    { label: 'Plumbing ', value: 'Plumbing' },
    { label: 'Electrical', value: 'Electrical' },
    { label: 'Roof', value: 'Roof' },
    { label: 'Structural', value: 'Structural' },
    { label: 'Appliances', value: 'Appliances' },
    {
      label: 'Safety and Security',
      value: 'Safety and Security',
    },
    { label: 'General', value: 'General' },
  ];

  const handleChange = (e) => {
    if (e.target.value.length > 250) return;
    setText(e.target.value);
  };

  const onClose = () => {
    onCloseReqMaintanceModal();
    setText('');
  };

  return (
    <>
      {isCheckout && (
        <OverlayModal close={onClose} modalRef={onModalRef} width={modalWidth}>
          <div className="checkout__modal">
            <div className="checkout">
              <span className="checkout__close" onClick={onClose}>
                &times;
              </span>
              <div
                className="checkout__icon"
                style={{ backgroundImage: `url(${ReqImage})` }}
              >
                &nbsp;
              </div>
              <div className="checkout__form">
                <h1 className="checkout__title">REQEUST detail</h1>
                <p>
                  Please enter your request information to complete the
                  maintenance request process for the property
                </p>
                <div className="form">
                  <div
                    style={{
                      padding: '.5rem 1.3rem',
                      border: '1px solid black',
                    }}
                  >
                    <CustomDropdown
                      options={options}
                      onSelect={handleSelect}
                      width={'auto'}
                    />
                  </div>

                  <textarea
                    name=""
                    id=""
                    style={{
                      width: '25rem',
                      padding: '1.2rem ',
                      border: '1px solid black',
                      height: '18rem',
                      marginTop: '2rem',
                      fontSize: '1.6rem',
                    }}
                    value={text}
                    onChange={handleChange}
                    placeholder="Enter the issue.."
                  ></textarea>
                  <span
                    style={{
                      fontSize: '1.4rem',
                      margin: '.9rem 0 ',
                      color: 'gray',
                    }}
                  >
                    {text.length}/250
                  </span>
                  <CustomButton
                    label="REQUEST NOW!"
                    color={'#E47675'}
                    style={{
                      padding: '1.5rem 2rem',
                      width: '100%',
                    }}
                    onClick={check}
                    disabled={!text || !selectedOption}
                  />
                </div>
              </div>
            </div>
          </div>
        </OverlayModal>
      )}
    </>
  );
};

ReqMaintanceModal.propTypes = {
  onCloseReqMaintanceModal: PropTypes.func.isRequired,
  onModalRef: PropTypes.object.isRequired,
  modalWidth: PropTypes.string.isRequired,
  onMaintance: PropTypes.func.isRequired,
  isCheckout: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

export default ReqMaintanceModal;
