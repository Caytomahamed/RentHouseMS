// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/helperFunction';

const ReviewItem = ({ review }) => {
  return (
    <div className="testimonial__box">
      <div className="testimonial__box-top">
        <div className="testimonial__profile">
          <div className="testimonial__profile-img">
            <img
              src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
              alt="User Image"
            />
          </div>
          <div className="testimonial__name-user">
            <strong className="testimonial__name">
              {review.firstname} {review.lastname}
            </strong>
            <span className="testimonial__username">
              {formatDate(review.created_at)}
            </span>
          </div>
        </div>
        <div className="testimonial__reviews">
          {[...Array(5)].map((star, index) => {
            const rateValue = index + 1;
            return (
              <span
                key={index}
                className={`star ${rateValue <= review.rating ? 'filled' : ''}`}
                style={{
                  cursor: 'pointer',
                  fontSize: '2rem',
                  color: rateValue <= review.rating ? 'rgb(180, 105, 14)' : '#e4e5e9',
                }}
              >
                &#9733;
              </span>
            );
          })}
        </div>
      </div>
      <div className="testimonial__comment">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, quaerat quis? Provident temporibus architecto
          asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur
          voluptates incidunt blanditiis sed atque cumque.
        </p>
      </div>
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;
