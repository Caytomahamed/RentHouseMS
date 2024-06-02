// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import OverlayModal from '../OverlayModal';

import PropTypes from 'prop-types';

import billImage from '../../assets/images/bill.png';
import { formatNumberWithCommas } from '../../utils/helperFunction';
import CustomDropdown from '../Custom/CustomDropdown';
import { toast } from 'react-toastify';
import CustomButton from '../Custom/CustomButton';


const CheckoutModal = ({
  onCloseCheckModal,
  onModalRef,
  modalWidth,
  onPay,
  isCheckout,
  item,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const rentPrice =
    '$' +
    formatNumberWithCommas(
      item.rentAmount + item.rentAmount * 0.5 + item.rentAmount * 0.1
    );

  const options = [
    { label: 'payment method', value: 'Select Payment Method' },
    { label: 'CASH', value: 'CHASH' },
    { label: 'ZAAD', value: 'ZAAD' },
    { label: 'E-DAHAB', value: 'E-DAHAB' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const check = () => {
    if (selectedOption && isChecked) {
      onPay(selectedOption.value);
      // console.log('Payment method:', selectedOption.value);

      onCloseCheckModal();
      return;
    }

    toast.error('Please select payment method and agree to the terms');

    onCloseCheckModal();
  };

  return (
    <>
      {isCheckout && (
        <OverlayModal
          close={onCloseCheckModal}
          modalRef={onModalRef}
          width={modalWidth}
        >
          <div className="checkout__modal">
            <div className="checkout">
              <span className="checkout__close" onClick={onCloseCheckModal}>
                &times;
              </span>
              <div
                className="checkout__icon"
                style={{ backgroundImage: `url(${billImage})` }}
              >
                &nbsp;
              </div>
              <div className="checkout__form">
                <h1 className="checkout__title">Enter your payment detail</h1>
                <p>
                  Please enter your account information to complete the payment
                </p>
                <div className="form">
                  <label>
                    <input
                      type="text"
                      name="amaout"
                      value={rentPrice}
                      placeholder="amount"
                      readOnly
                    />
                  </label>
                  <div
                    style={{
                      width: '15rem',
                      padding: '.3rem 0rem',
                      border: '1px solid black',
                    }}
                  >
                    <CustomDropdown
                      options={options}
                      onSelect={handleSelect}
                      width={'14rem'}
                    />
                  </div>

                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="legalDocs"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="legalDocs">
                      I have read and agree to all rules and legal documents.
                    </label>
                    <a
                      href="https://docs.google.com/document/d/1d9RoFWCsiNR9XTmht3za25zCzEix4fC3vyRP1fHleOg/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="document-link"
                    >
                      Read the document
                    </a>
                  </div>

                  <CustomButton
                    label="RENT NOW!"
                    color={'#E47675'}
                    style={{
                      padding: '1.5rem 2rem',
                      // marginTop: '2rem',
                      width: '100%',
                    }}
                    onClick={check}
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

// Prop types
CheckoutModal.propTypes = {
  onCloseCheckModal: PropTypes.func.isRequired,
  onModalRef: PropTypes.object.isRequired,
  modalWidth: PropTypes.string.isRequired,
  onPay: PropTypes.func.isRequired,
  isCheckout: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};
export default CheckoutModal;
