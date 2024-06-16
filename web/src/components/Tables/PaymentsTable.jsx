/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { formatDate } from '../../utils/helperFunction';
// import personImg from '../../assets/icons/profile-icon.svg';
const capitalized = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
// eslint-disable-next-line react/prop-types
const PaymentsTable = ({ item }) => {
  const paymentMethodColor = {
    Cash: '#7a00b8',
    Zaad: 'green',
    Edahab: 'orange',
  };

  // string remove - and new string
  const newString = capitalized(item.paymentMethod.replace(/-/g, ''));

  // create string capitalize first letter and rest lowercase

  return (
    <>
      <td className="id">#{item.id}</td>
      <td
        style={{
          textAlign: 'center',
          transform: 'translateX(-20%)',
          fontWeight: 'bold',
        }}
      >
        #{item.bookingId}
      </td>
      <td
        style={{
          textAlign: 'center',
          transform: 'translateX(-10%)',
          fontWeight: 'bold',
        }}
      >
        #{item.landLordId}
      </td>
      <td
        style={{
          paddingLeft: '.8rem',
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        ${item.amount}
      </td>
      <td
        style={{
          paddingLeft: '.8rem',
          fontWeight: 'bold',
        }}
      >
        <div
          className="userType"
          style={{
            color: paymentMethodColor[newString],
            borderColor: paymentMethodColor[newString],
            borderWidth: '1px',
            borderStyle: 'solid',
            fontWeight: 'bold',
          }}
        >
          <p>{capitalized(item.paymentMethod)}</p>
        </div>
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
          <p>{item.transactionId}</p>
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
          <p>{formatDate(item.paidAt)}</p>
        </div>
      </td>
    </>
  );
};

export default PaymentsTable;
