/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import personImg from '../../assets/icons/profile-icon.svg';
import { formatDate } from '../../utils/helperFunction';
import { useDispatch } from 'react-redux';
import {
  confirmRentProperty,
  rejectRentProperty,
} from '../../store/slices/boookSlice';
import { toast } from 'react-toastify';
import { uploadFolder } from '../../../config/config';

// eslint-disable-next-line react/prop-types
const BookingTable = ({ item }) => {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(confirmRentProperty(item.id));
    toast.success('Booking Confirmed');
  };

  const handleReject = () => {
    dispatch(rejectRentProperty(item.id));
    toast.error('Booking Rejected');
  };

  const currentDay = formatDate(new Date());

  return (
    <>
      <td
        className="id"
        style={{
          background: item.isCanclellation && '#E47675',
          color: item.isCanclellation && '#fff',
        }}
      >
        #{item.id}
      </td>
      <td
        className="table-user-profile"
        style={{
          background: currentDay >= item.endDate && '#E47675d0',
        }}
      >
        <div>
          <div className="table-user-profile-box">
            {item.tenantImageUrl &&
            item.tenantImageUrl !== 'undefined' &&
            item.tenantImageUrl !== 'url_to_image' ? (
              <img src={`${uploadFolder}/${item.tenantImageUrl}`} alt="image" />
            ) : (
              <img src={personImg} alt="image" />
            )}
          </div>
        </div>
        <div>
          <h2>
            {item.tenantFirstName} {item.tenantLastName}
          </h2>
          <p>{item.tenantEmail}</p>
          <p className="table-user-profile-address">
            Address: {item.tenantAddress}
          </p>
        </div>
      </td>

      <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
        #{item.propertyId}
      </td>

      <td
        style={{
          paddingLeft: '.8rem',
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        ${item.rentAmount}
      </td>
      <td>
        <div
          className="userType"
          style={{
            color: '#FB5559',
            borderColor: '#FB5559',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontWeight: 'bold',
          }}
        >
          <p>{formatDate(item.startDate)}</p>
        </div>
      </td>
      <td>
        <div
          className="userType"
          style={{
            color: '#0000ff',
            borderColor: '#0000ff',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <p>{formatDate(item.endDate)}</p>
        </div>
      </td>
      <td>
        {!item?.isConfirm && !item?.isReject ? (
          <div>
            <p
              style={{
                backgroundColor: 'rgb(76, 175, 80)',
                padding: '0.5rem 1rem',
                textAlign: 'center',
                color: 'white',
                borderRadius: '5px',
                marginBottom: '1rem',
                cursor: 'pointer',
              }}
              onClick={handleConfirm}
            >
              Confirm
            </p>
            <p
              style={{
                backgroundColor: '#FF7F7F',
                padding: '0.5rem 1rem',
                textAlign: 'center',
                color: 'white',
                borderRadius: '5px',
                marginBottom: '1rem',
                cursor: 'pointer',
              }}
              onClick={handleReject}
            >
              Reject
            </p>
          </div>
        ) : (
          <>
            {item?.isConfirm !== 0 && <p style={{ textAlign: 'center' }}>✅</p>}
            {item?.isReject !== 0 && <p style={{ textAlign: 'center' }}>❌</p>}
          </>
        )}
      </td>
    </>
  );
};

export default BookingTable;
