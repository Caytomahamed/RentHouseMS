/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  formatDateWithLong,
  formatNumberWithCommas,
} from '../../utils/helperFunction';

const capitalized = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const YourRentTransactions = ({ isMoveDay, payments }) => {
  const paymentMethodColor = {
    Cash: '#7a00b8',
    Zaad: 'green',
    Edahab: 'orange',
  };

  return (
    <>
      {isMoveDay && (
        <div
          style={{
            margin: '0rem 5rem 10rem 5rem',
          }}
        >
          <h1 style={{ marginBottom: '5rem', fontSize: '3rem' }}>
            My Transations
          </h1>
          {/* transition table  */}

          <div
            style={{ boxShadow: '0 1rem 2rem rgba(0,0,0,.1)', padding: '4rem' }}
          >
            <table>
              <tr style={{ height: '3rem' }}>
                <th>TransactionId</th>
                <th>Amout</th>
                {/* <th>Req. Maintance</th> */}
                {/* <th>Payment Status</th> */}
                <th>Method</th>
                <th>TransactionId</th>
                <th>Paid At</th>
                <th>Status</th>
              </tr>
              {payments.map((payment) => {
                const newString = capitalized(
                  payment.paymentMethod.replace(/-/g, '')
                );

                return (
                  <tr key={payment.id}>
                    <td style={{ padding: '1.5rem 0' }}>{payment?.id}</td>
                    <td style={{ fontWeight: 'bold' }}>
                      ${formatNumberWithCommas(payment?.amount)}
                    </td>
                    <td>{capitalized(payment?.status)}</td>
                    <td>{payment?.transactionId}</td>
                    <td>{formatDateWithLong(new Date(payment?.paidAt))}</td>
                    <td

                    >
                      <div
                        style={{
                          color: paymentMethodColor[newString],
                          borderColor: paymentMethodColor[newString],
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          height: '3.5rem',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {payment?.paymentMethod}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default YourRentTransactions;
