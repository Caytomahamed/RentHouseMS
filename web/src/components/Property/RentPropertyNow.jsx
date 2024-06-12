/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import CustomButton from '../Custom/CustomButton';
import { formatNumberWithCommas } from '../../utils/helperFunction';
import CheckoutModal from '../modols/CheckoutModal';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import ReviewModal from '../modols/ReviewModal';

const RentPropertyNow = ({ item, onRent }) => {
  const price = formatNumberWithCommas(item.rentAmount);
  const securityDeposit = formatNumberWithCommas(item.rentAmount * 0.5);
  const owerFee = formatNumberWithCommas(item.rentAmount * 0.1);
  const total = item.available
    ? formatNumberWithCommas(
        item.rentAmount + item.rentAmount * 0.5 + item.rentAmount * 0.1
      )
    : price;

  const labels = item.available ? 'Apply Now' : 'Pay Rent';

  const [isCheckout, setIsCheckout] = useState(false);
  const onCloseCheckModal = () => {
    setIsCheckout(false);
  };

  const onOpenCheckModal = () => {
    setIsCheckout(true);
  };

  const onModalRef = useOutsideClick(() => onCloseCheckModal());

  const [isReview, setIsReview] = useState(false);

  // open and close review modal
  const onOpenReviewModal = () => {
    setIsReview(true);
  };

  const onCloseReviewModal = () => {
    setIsReview(false);
  };

  const onReview = () => {
    console.log('Review');
    onCloseReviewModal();
  };

  const onModalRefReview = useOutsideClick(() => onCloseReviewModal());

  return (
    <div className="rentnow">
      <p>Rent price</p>
      <span className="rentnow__title">
        <span className="rentnow__title--main">${price}</span>/month
      </span>

      <CustomButton
        label={labels}
        color={'#E47675'}
        style={{ padding: '1.5rem 2rem', marginTop: '2rem', width: '100%' }}
        onClick={onOpenCheckModal}
      />

      {item.available === 0 && (
        <CustomButton
          label={'Review'}
          style={{ padding: '1.5rem 2rem', marginTop: '2rem', width: '100%' }}
          onClick={onOpenReviewModal}
        />
      )}

      <CheckoutModal
        isCheckout={isCheckout}
        onModalRef={onModalRef}
        onPay={onRent}
        onCloseCheckModal={onCloseCheckModal}
        modalWidth="30rem"
        item={item}
      />

      <ReviewModal
        isReview={isReview}
        onClose={onCloseReviewModal}
        onReview={onReview}
        onModalRef={onModalRefReview}
      />

      {item.available !== 0 && (
        <div className="rentnow__info">
          <div>
            <p>Security Deposit </p>
            <p className="info__rent_p">${price}</p>
          </div>
          <div>
            <p>Kiro dhow service fee </p>
            <p className="info__rent_p">${owerFee}</p>
          </div>
        </div>
      )}

      <div className="rentnow__total">
        <div>
          <p>Total rent of house </p>
          <p>${total}</p>
        </div>
      </div>
    </div>
  );
};

export default RentPropertyNow;
