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
  rentPaid = false,
  apply = false,
  landLordPaid1month,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const inintState = () => {
    setIsChecked(false);
    setSelectedOption(null);
    onCloseCheckModal();
  };

  const check = () => {
    // ('selectedOption:', selectedOption);
    // ('isCheck:', isChecked);

    if (selectedOption && rentPaid && isChecked) {
      onPay(selectedOption.value);
      inintState();
      return;
    }

    if (!rentPaid && isChecked) {
      onPay();
      inintState();
      return;
    }

    toast.error('Please select a payment method and agree to the terms');
    inintState();
  };

  const rentPrice = landLordPaid1month
    ? '$' +
      formatNumberWithCommas(
        item.rentAmount + item.rentAmount * 0.35 + item.rentAmount * 0.05
      )
    : rentPaid
    ? '$' + formatNumberWithCommas(item.rentAmount)
    : '$' +
      formatNumberWithCommas(
        item.rentAmount + item.rentAmount * 0.35 + item.rentAmount * 0.05
      );

  const options = [
    { label: 'Select Payment Method', value: '' },
    { label: 'CASH', value: 'CASH' },
    { label: 'ZAAD', value: 'ZAAD' },
    { label: 'E-DAHAB', value: 'E-DAHAB' },
  ];

  return (
    <>
      {isCheckout && (
        <OverlayModal
          close={inintState}
          modalRef={onModalRef}
          width={modalWidth}
        >
          <div className="checkout__modal">
            <div className="checkout">
              <span className="checkout__close" onClick={inintState}>
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
                      name="amount"
                      value={rentPrice}
                      placeholder="Amount"
                      readOnly
                    />
                  </label>
                  {(rentPaid || landLordPaid1month) && (
                    <div
                      style={{
                        padding: '.5rem 1.3rem',
                        border: '1px solid black',
                      }}
                    >
                      <CustomDropdown
                        options={options}
                        onSelect={handleSelect}
                      />
                    </div>
                  )}

                  <div
                    className="checkbox-container"
                    style={{
                      transform: !rentPaid && `translateY(-1.7rem)`,
                    }}
                  >
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
                      width: '100%',
                    }}
                    onClick={check}
                    disabled={apply}
                  />
                  {apply && (
                    <p>
                      Your already booked a house please check your inbox or
                      cantact us admin[id=1]
                    </p>
                  )}
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
  rentPaid: PropTypes.bool,
  apply: PropTypes.bool,
  landLordPaid1month: PropTypes.bool,
};

export default CheckoutModal;
