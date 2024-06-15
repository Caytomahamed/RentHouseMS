/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import personImg from '../../assets/icons/profile-icon.svg';

// eslint-disable-next-line react/prop-types
const BookingTable = ({ item }) => {
  return (
    <>
      <td className="id">#{item.id}</td>
      <td className="table-user-profile">
        <div>
          <div className="table-user-profile-box">
            {item.tenantImageUrl &&
            item.tenantImageUrl !== 'undefined' &&
            item.tenantImageUrl !== 'url_to_image' ? (
              <img
                src={`http://localhost:9000/uploads/${item.tenantImageUrl}`}
                alt="image"
              />
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
      <td
        style={{
          paddingLeft: '.8rem',
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        ${item.securityDeposit}
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
          <p>{item.startDate}</p>
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
          <p>{item.endDate}</p>
        </div>
      </td>
    </>
  );
};

export default BookingTable;
