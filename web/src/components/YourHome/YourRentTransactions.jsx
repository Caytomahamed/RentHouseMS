/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const YourRentTransactions = ({ isMoveDay, property }) => {
  return (
    <>
      {isMoveDay && (
        <div
          style={{
            margin: '0rem 5rem 10rem 5rem',
          }}
        >
          <h1 style={{ marginBottom: '5rem', fontSize: '3rem' }}>
            Your Transitions
          </h1>
          {/* transition table  */}

          <table>
            <tr>
              <th>Property</th>
              <th>Move In</th>
              <th>Move Out</th>
              <th>Req. Maintance</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>TransactionId</th>
            </tr>
            <tr>
              <td>{property?.propertyId}</td>
              <td>{property?.isMoveIn ? 'Yes' : 'No'}</td>
              <td>{property?.isMoveOut ? 'Yes' : 'No'}</td>
              <td>{property?.isIssue ? 'Yes' : 'No'}</td>
              <td>{property?.isConfirm ? 'Paid' : 'Not Paid'}</td>
              <td>
                {property?.paymentMethod ? property.paymentMethod : 'ZAAD'}
              </td>
              <td>
                {property?.transactionId ? property.transactionId : 'ZAAD-1234'}
              </td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
};

export default YourRentTransactions;
