// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OverlayModal from '../OverlayModal';
import CustomButton from '../Custom/CustomButton';
// import CustomButton from '../Custom/CustomButton';

const ReviewModal = ({ isReview, onClose, onReview, onModalRef }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleMouseEnter = (rate) => {
    setHover(rate);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleCommentChange = (event) => {
    if (event.target.value.length > 300) return;
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    onReview({ rating, comment });
    onClose();
  };

  const closeModal = () => {
    onClose();
    comment('');
    setHover(0);
    setRating(0);
  };
  return (
    <>
      {isReview && (
        <OverlayModal
          close={closeModal}
          modalRef={onModalRef}
          width={30}
        >
          <div className="review-modal">
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                const rateValue = index + 1;
                return (
                  <span
                    key={index}
                    className={`star ${
                      rateValue <= (hover || rating) ? 'filled' : ''
                    }`}
                    onClick={() => handleRatingClick(rateValue)}
                    onMouseEnter={() => handleMouseEnter(rateValue)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      cursor: 'pointer',
                      fontSize: '5rem',
                      color:
                        rateValue <= (hover || rating)
                          ? 'rgb(180, 105, 14)'
                          : '#e4e5e9',
                    }}
                  >
                    &#9733;
                  </span>
                );
              })}
            </div>

            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Leave your comment here"
              rows="4"
              style={{
                width: '100%',
                marginTop: '1.6rem',
                fontSize: '1.6rem',
                padding: '1rem',
                height: '20rem',
              }}
            />

            <span
              style={{
                fontSize: '1.4rem',
                margin: '.9rem 0 ',
                color: 'gray',
              }}
            >
              {comment.length}/300
            </span>

            <CustomButton
              label="Submit Review"
              style={{
                marginTop: '2rem',
                width: '100%',
              }}
              onClick={handleSubmit}
            />
          </div>
        </OverlayModal>
      )}
    </>
  );
};

ReviewModal.propTypes = {
  isReview: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReview: PropTypes.func.isRequired,
  onModalRef: PropTypes.func.isRequired,
  table: PropTypes.string.isRequired,
};
export default ReviewModal;
