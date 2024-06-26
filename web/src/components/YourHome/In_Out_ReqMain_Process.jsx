/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {
  addDaysToDate,
  capitalize,
  daysPassed,
  formatDate,
  formatDateWithLong,
} from '../../utils/helperFunction';
import CustomButton from '../Custom/CustomButton';

const In_Out_ReqMain_Process = ({
  isProcess,
  property,
  onOpenMoveIn,
  onOpenMoveOut,
}) => {
  const isReq = property?.isIssue;
  const isCanclellation = property?.isCanclellation;
  const dayMoveInStep =
    property.startDate && daysPassed(new Date(property?.startDate));
  const dayMoveOutStep =
    property.startDate &&
    daysPassed(new Date(property.cancellationRequestedAt));
  const isMove = property?.isMoveIn && dayMoveInStep < 7;

  const moveinStartedDate = formatDateWithLong(
    addDaysToDate(new Date(property?.startDate), 1)
  );
  const moveOutStartedDate = formatDateWithLong(
    addDaysToDate(new Date(property.cancellationRequestedAt), 1)
  );

  const cancleStatus = {
    requested: '#9b59b6', // Amber
    in_progress: '#3498db', // Sky Blue
    finalizing: 'red', // Purple
    preparation: 'green', // Green
    repairs: 'orange', // Red
    outDay: 'red',
    postMove: 'brown',
  };

  // reqStatus 'pending', 'completed', 'rejected' and give  colors
  const reqStatus = {
    pending: '#ff9900', // Sky Blue
    requested: '#ff9900', // Sky Blue
    completed: '#2ecc71', // Green
    rejected: '#e74c3c', // Red
  };

  return (
    <>
      {isProcess && (
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
                {isMove && (
                  <>
                    <h1
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Move in Process
                    </h1>
                    {dayMoveInStep === 0 && (
                      <p style={{ marginTop: '1rem', lineHeight: '1.5' }}>
                        The move process will starte tomorrow
                        <span style={{ fontWeight: 'bold' }}>
                          {' '}
                          <span style={{ display: 'block' }}>
                            {' '}
                            [{moveinStartedDate}]
                          </span>
                        </span>{' '}
                        be ready
                      </p>
                    )}
                    <div style={{ margin: '1rem 0' }}>
                      <CustomButton
                        label="Process in details"
                        style={{ marginRight: '2rem', width: '90%' }}
                        onClick={onOpenMoveIn}
                        color={'#FF4500'}
                        disabled={dayMoveInStep === 0}
                      />
                    </div>
                  </>
                )}
                {isCanclellation !== 0 && (
                  <>
                    <h1
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        marginTop: '2rem',
                      }}
                    >
                      Move Out Process
                    </h1>
                    {property.cancellationStatus &&
                      property.cancellationStatus !== 'completed' && (
                        <div
                          style={{
                            display: 'flex',
                            margin: '0',
                            marginTop: '1.5rem',
                            alignItems: 'center',
                          }}
                        >
                          <h1 style={{ marginRight: '1rem' }}>Status:</h1>
                          <p
                            style={{
                              fontWeight: 'bold',
                              border: `1px solid ${
                                cancleStatus[property.cancellationStatus]
                              }`,
                              padding: '1rem 3rem',
                              // transform: 'translatex(-2rem)',
                              color: cancleStatus[property.cancellationStatus],
                            }}
                          >
                            {capitalize(property.cancellationStatus)}
                          </p>
                        </div>
                      )}

                    {dayMoveOutStep === 0 && (
                      <p style={{ marginTop: '1rem', lineHeight: '1.5' }}>
                        The Move out process will starte
                        <span style={{ fontWeight: 'bold' }}>
                          {' '}
                          <span style={{ display: 'block' }}>
                            {' '}
                            [{moveOutStartedDate}]
                          </span>
                        </span>{' '}
                        be ready
                      </p>
                    )}
                    <div style={{ margin: '2rem 0' }}>
                      <CustomButton
                        label="Process in details"
                        style={{ width: '90%' }}
                        onClick={onOpenMoveOut}
                        color={'purple'}
                        disabled={dayMoveOutStep === 0}
                      />
                    </div>
                  </>
                )}
                {isReq && (
                  <>
                    <h1
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Req Maintenance Process status
                    </h1>
                    <table>
                      <tr>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Due Date</th>
                      </tr>
                      {property.maintenanceTypes
                        .split(',')
                        .map((item, index) => (
                          <tr key={item}>
                            <td>{item}</td>
                            <td
                              style={{
                                color:
                                  reqStatus[
                                    property.maintenanceStatuses.split(',')[
                                      index
                                    ]
                                  ],
                                paddingLeft: '1rem',
                                margin: '0rem 1rem',
                              }}
                            >
                              {property.maintenanceStatuses.split(',')[index]}
                            </td>
                            <td>
                              {formatDate(
                                new Date(
                                  property.maintenanceExpectedDates.split(',')[
                                    index
                                  ]
                                )
                              )}
                            </td>
                          </tr>
                        ))}
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

In_Out_ReqMain_Process.propType = {
  property: PropTypes.object,
  onOpenMoveIn: PropTypes.func,
  onOpenMoveOut: PropTypes.func,
  isProcess: PropTypes.bool,
};
export default In_Out_ReqMain_Process;
