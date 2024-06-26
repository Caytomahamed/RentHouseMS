/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { capitalize } from '../../utils/helperFunction';
import PropTypes from 'prop-types';

const NotConfirm = ({ isConfirm, currentUser }) => {
  return (
    <>
      {isConfirm && (
        <div
          className="col-1-of-3"
          data-id="11"
          style={{ marginTop: '0rem', marginRight: '5rem' }}
        >
          <div className="card" data-id="11">
            <div
              className="card__side card__side--front"
              style={{ padding: '1.5rem' }}
            >
              <div
                style={{
                  margin: '2rem 0rem',
                  paddingLeft: '2rem',
                }}
              >
                <h1
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                  }}
                >
                  Rental Application Information
                </h1>
                <div style={{ display: 'flex', margin: '1rem 0' }}>
                  <p style={{ lineHeight: '1.5' }}>
                    {' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {capitalize(currentUser?.firstname)}
                    </span>
                    , upon receipt of your complete application, our team will
                    conduct a thorough review process, which typically takes
                    approximately{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      one business days.
                    </span>{' '}
                    We understand your eagerness to find a new home, and we
                    appreciate your patience during this time. We will contact
                    you directly via phone or email with an update on your
                    application status within this timeframe. but if you prefer
                    to be reached by email,
                    <span style={{ fontWeight: 'bold' }}>
                      kiro@admin@gmail.com
                    </span>
                    please let us know.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

NotConfirm.propType = {
  currentUser: PropTypes.object,
  isConfirm: PropTypes.bool,
};

export default NotConfirm;
