/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  formatDateWithLong,
  formatNumberWithCommas,
} from '../../utils/helperFunction';

const YourRentTransactions = ({ isMoveDay, payments }) => {
  //   .select(
  //   'p.id',
  //   'b.id as bookingId',
  //   'b.tenantId as tenantId',
  //   'p.amount as amount',
  //   'p.status',
  //   'p.paymentMethod',
  //   'p.transactionId',
  //   'p.paidAt',
  // )
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

          <div
            style={{ boxShadow: '0 1rem 2rem rgba(0,0,0,.1)', padding: '4rem' }}
          >
            <table>
              <tr>
                <th>TransactionId</th>
                <th>Amout</th>
                <th>Status</th>
                {/* <th>Req. Maintance</th> */}
                {/* <th>Payment Status</th> */}
                <th>Payment Method</th>
                <th>TransactionId</th>
                <th>Paid At</th>
              </tr>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment?.id}</td>
                  <td style={{ fontWeight: 'bold' }}>
                    ${formatNumberWithCommas(payment?.amount)}
                  </td>
                  <td>{payment?.status}</td>
                  <td>{payment?.paymentMethod}</td>
                  <td>{payment?.transactionId}</td>
                  <td>{formatDateWithLong(new Date(payment?.paidAt))}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default YourRentTransactions;
