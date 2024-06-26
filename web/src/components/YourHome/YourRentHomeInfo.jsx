/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../Custom/CustomButton';
import {
  addDaysToDate,
  daysPassed,
  formatDateWithLong,
  isEventInThreeDaysOrPassed,
} from '../../utils/helperFunction';

const YourRentHomeInfo = ({
  property,
  onOpenReqMain,
  onOpenCancle,
  onOpenCheck,
  isMoveDay,
}) => {
  const takeOverKeyDate = formatDateWithLong(
    addDaysToDate(new Date(property.startDate), 3)
  );

  const is3Request = property?.maintenanceStatuses
    ?.split(',')
    .filter((item) => item !== 'completed').length;

  const dayMoveInStep =
    property.startDate && daysPassed(new Date(property.startDate));

  // no canclellation time if stared day minus the current day is less then 15
  const noCanclellationTime = dayMoveInStep < 15;

  const left3DaysOrPassDueDate = isEventInThreeDaysOrPassed(
    new Date(property.endDate)
  );

  return (
    <>
      {isMoveDay && (
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
                  About the Owner
                </h1>
                <div style={{ display: 'flex', margin: '1rem 0' }}>
                  <h1 style={{ marginRight: '1rem' }}>Owner IDNO:</h1>
                  <p style={{ fontWeight: 'bold' }}>{property.landLordId}</p>
                </div>
                <div style={{ display: 'flex', margin: '1rem 0' }}>
                  <h1 style={{ marginRight: '1rem' }}>Owner Name:</h1>
                  <p style={{ fontWeight: 'bold' }}>
                    {property.landLordFirstName} {property.landLordLastName}
                  </p>
                </div>
                <div style={{ display: 'flex', margin: '1rem 0' }}>
                  <h1 style={{ marginRight: '1rem' }}>Owner Contact:</h1>
                  <p style={{ fontWeight: 'bold' }}>{property.landLordPhone}</p>
                </div>
              </div>

              <h1
                style={{
                  margin: '2rem 0rem',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  paddingLeft: '2rem',
                }}
              >
                Information About Payment
              </h1>
              <div style={{ margin: '1rem 2rem' }}>
                <div style={{ display: 'flex', margin: '1rem 0' }}>
                  <h1 style={{ marginRight: '1rem' }}>Payment Status:</h1>
                  <p style={{ fontWeight: 'bold' }}>Paid</p>
                </div>

                <div style={{ display: 'flex', margin: '1rem 0' }}>
                  <h1 style={{ marginRight: '1rem' }}>Payment Start:</h1>
                  <p style={{ fontWeight: 'bold' }}>
                    {formatDateWithLong(new Date(property.startDate))}
                  </p>
                </div>
                <div style={{ display: 'flex', margin: '1rem 0' }}>
                  <h1 style={{ marginRight: '1rem' }}>Payment Due:</h1>
                  <p style={{ fontWeight: 'bold' }}>
                    {formatDateWithLong(new Date(property.endDate))}
                  </p>
                </div>
                <div style={{ display: 'flex', margin: '1rem 0' }}>
                  <h1 style={{ marginRight: '1rem' }}>Key TakeOver:</h1>
                  <p style={{ fontWeight: 'bold' }}>{takeOverKeyDate}</p>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <CustomButton
                    label="Req. Maintenance"
                    style={{ marginRight: '2rem', width: '100%' }}
                    onClick={onOpenReqMain}
                    color={' #ff9900'}
                    disabled={is3Request === 3}
                  />
                </div>
                <h1
                  style={{
                    margin: '2rem 0rem',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginTop: '2rem',
                  }}
                >
                  Paid Rent and Canclellation Req.
                </h1>
                <div style={{ marginTop: '2rem' }}>
                  <CustomButton
                    label="Paid Rent"
                    style={{ marginRight: '2rem', width: '46%' }}
                    onClick={onOpenCheck}
                    disabled={!left3DaysOrPassDueDate}
                  />
                  <CustomButton
                    label="Cancle"
                    color={'#E47675'}
                    onClick={onOpenCancle}
                    style={{ width: '46%' }}
                    disabled={noCanclellationTime}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

YourRentHomeInfo.propType = {
  property: PropTypes.object,
  onOpenReqMain: PropTypes.func,
  onOpenCancle: PropTypes.func,
  onOpenCheck: PropTypes.func,
  isMoveDay: PropTypes.bool,
};

export default YourRentHomeInfo;
