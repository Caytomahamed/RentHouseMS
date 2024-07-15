/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { capitalize, formatDate } from '../../utils/helperFunction';
import noReadIcon from '../../assets/icons/noread.svg';
import readIcon from '../../assets/icons/read.svg';
import defaultImgIcon from '../../assets/images/defaultImg.png';
import { uploadFolder } from '../../../config/config';

// eslint-disable-next-line react/prop-types
const InboxItem = ({ inbox }) => {
  const img = inbox?.imageUrl
    ? `${uploadFolder}/${inbox.imageUrl}`
    : defaultImgIcon;

  const borderColor =
    inbox?.FromOrTo === 'admin' ||
    inbox?.FromOrTo === 'allowner' ||
    inbox?.FromOrTo === 'alltenants'
      ? 'red'
      : 'blue';

  return (
    <div
      className="testimonial__box"
      style={{
        padding: '4rem',
        border: `1px solid ${borderColor}`,
        marginRight: '2rem',
        marginTop: '2rem',
        boxShadow: '2px 2px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '1rem',
        opacity: Object.keys(inbox).length > 0 ? 1 : 0.2,
        position: 'relative',
      }}
    >
      <div className="testimonial__box-top">
        <div className="testimonial__profile">
          <div className="testimonial__profile-img">
            <img src={img} alt="User Image" />
          </div>
          <div className="testimonial__name-user">
            <strong
              className="testimonial__name"
              style={{
                color:
                  inbox.senderFirstName || inbox.senderLastName
                    ? 'inherit'
                    : 'gray',
                fontWeight: 'bold',
              }}
            >
              {inbox.senderFirstName
                ? capitalize(inbox.senderFirstName)
                : 'FirstName'}{' '}
              {inbox.senderLastName
                ? capitalize(inbox.senderLastName)
                : 'LastName'}
            </strong>
            <span className="testimonial__username">
              SenderId: [{inbox.senderId}]
            </span>
          </div>
        </div>
        <div className="testimonial__reviews" style={{ color: 'gray' }}>
          {inbox.created_at ? formatDate(inbox.created_at) : 'Date'}
        </div>
      </div>
      <div className="testimonial__comment">
        <h1
          style={{
            fontSize: '2.4rem',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            color: inbox.subject ? 'inherit' : 'gray',
          }}
        >
          {inbox.subject ? inbox.subject : 'Empty title'}
        </h1>
        <p>
          {!inbox?.message?.length
            ? `Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, quaerat quis? Provident temporibus architecto
          asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur
          voluptates incidunt blanditiis sed atque cumque.`
            : inbox?.message}
        </p>

        <img
          src={inbox.is_read ? readIcon : noReadIcon}
          alt="no read"
          style={{ position: 'absolute', right: '2rem' }}
        />
      </div>
    </div>
  );
};

export default InboxItem;
