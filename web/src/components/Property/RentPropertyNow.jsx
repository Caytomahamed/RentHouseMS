/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import CustomButton from '../Custom/CustomButton';
import { formatNumberWithCommas } from '../../utils/helperFunction';
import CheckoutModal from '../modols/CheckoutModal';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import ReviewModal from '../modols/ReviewModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReview,
  isHasReview,
  selectMyReview,
} from '../../store/slices/reviewSlice';
import { toast } from 'react-toastify';
import { appSelectUsers } from '../../store/slices/auth';

const RentPropertyNow = ({ item, onRent, apply = false }) => {
  const dispatch = useDispatch();
  const price = formatNumberWithCommas(item.rentAmount);
  const securityDeposit = formatNumberWithCommas(item.rentAmount * 0.35);
  const owerFee = formatNumberWithCommas(item.rentAmount * 0.05);

  const total = item.available
    ? formatNumberWithCommas(
        item.rentAmount + item.rentAmount * 0.35 + item.rentAmount * 0.1
      )
    : price;

  const labels = item.available ? 'Apply Now' : 'Pay Rent';

  const [isCheckout, setIsCheckout] = useState(false);
  const onCloseCheckModal = () => {
    setIsCheckout(false);
  };

  const onOpenCheckModal = () => {
    if (currentUser) {
      setIsCheckout(true);
      return;
    }
    toast.error('Please Login or Signup to Rent this House');
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

  const onReview = (review) => {
    if (!review) return toast.error('Please fill in the review form');
    dispatch(createReview(review));
    onCloseReviewModal();
    toast.success('Review submitted successfully');
  };

  const onModalRefReview = useOutsideClick(() => onCloseReviewModal());

  // state
  const { currentUser } = useSelector(appSelectUsers);

  useEffect(() => {
    if (!currentUser) return;
    dispatch(isHasReview(currentUser.id, +item.id));
  }, [currentUser, dispatch, item.id]);

  const myReviews = useSelector(selectMyReview);

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
        // disabled={labels === 'Apply Now' && myReviews.length !== 0}
      />

      {item.available === 0 && (
        <CustomButton
          label={'Review'}
          style={{ padding: '1.5rem 2rem', marginTop: '2rem', width: '100%' }}
          onClick={onOpenReviewModal}
          disabled={myReviews && myReviews.length !== 0}
        />
      )}

      {myReviews && myReviews.length !== 0 && item.available === 0 && (
        <p style={{ marginTop: '1rem' }}>
          You have already reviewed this house
        </p>
      )}

      {myReviews && myReviews.length !== 0 && item.available === 0 && (
        <p style={{ marginTop: '1rem' }}>
          You have already reviewed this house
        </p>
      )}

      <CheckoutModal
        isCheckout={isCheckout}
        onModalRef={onModalRef}
        onPay={onRent}
        onCloseCheckModal={onCloseCheckModal}
        modalWidth="30rem"
        item={item}
        apply={apply}
      />

      {myReviews && myReviews.length === 0 && item.available === 0 && (
        <ReviewModal
          isReview={isReview}
          onClose={onCloseReviewModal}
          onReview={onReview}
          onModalRef={onModalRefReview}
          item={item}
        />
      )}

      {item.available !== 0 && (
        <div className="rentnow__info">
          <div>
            <p>Rent fee </p>
            <p className="info__rent_p">${price}</p>
          </div>
          <div>
            <p>Security Deposit </p>
            <p className="info__rent_p">${securityDeposit}</p>
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
