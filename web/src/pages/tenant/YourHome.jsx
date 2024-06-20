// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import MenuHeader from '../../components/Header/MenuHeader';
// import PropertyList from '../../components/Property/PropertyList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getYourRentProperty,
  paidRentProperty,
  requestCancellation,
  selectBook,
} from '../../store/slices/boookSlice';
import Loading from '../../components/Custom/Loading';
import { Link } from 'react-router-dom';
import PropertyItem from '../../components/Property/PropertyItem';
import emptyHouse from '../../assets/images/emptyhouse.jpg';
import {
  addDaysToDate,
  capitalize,
  createTransactionId,
  daysPassed,
  formatDate,
  formatDateWithLong,
  isEventInThreeDaysOrPassed,
} from '../../utils/helperFunction';
import CustomButton from '../../components/Custom/CustomButton';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import CheckoutModal from '../../components/modols/CheckoutModal';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/modols/DeleteModal';
import ReqMaintanceModal from '../../components/modols/ReqMaintanceModal';
import MoveInProcessModal from '../../components/modols/MoveInProcessModal';
import moveInProcessSteps from '../../../config/moveInProcessSteps.json';
import moveOutProcessSteps from '../../../config/moveOutProcessSteps.json';
import { selectMaintanace } from '../../store/slices/maintanceSlice';
import { appSelectUsers, getCurrentUser } from '../../store/slices/auth';

const YourHome = () => {
  const dispatch = useDispatch();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isReqMain, setIsReqMain] = useState(false);
  const [isCancle, setIsCancle] = useState(false);
  const [isMoveIn, setIsMoveIn] = useState(false);
  const [isMoveOut, setIsMoveOut] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { currentUser } = useSelector(appSelectUsers);

  // cancle modal
  const onCloseCancleModal = () => {
    setIsCancle(false);
  };
  const onOpenCancleModal = () => {
    setIsCancle(true);
  };
  const onRef = useOutsideClick(() => onCloseCancleModal());

  // checkout modal
  const onCloseCheckModal = () => {
    setIsCheckout(false);
  };
  const onOpenCheckModal = () => {
    setIsCheckout(true);
  };
  const onModalRef = useOutsideClick(() => onCloseCheckModal());

  // req maintance modal
  const onCloseReqMainModal = () => {
    setIsReqMain(false);
  };
  const onOpenReqMainModal = () => {
    setIsReqMain(true);
  };
  const onReqMainRef = useOutsideClick(() => onCloseReqMainModal());

  // move in process modal open, close ans onref
  const onCloseMoveInModal = () => {
    setIsMoveIn(false);
  };
  const onOpenMoveInModal = () => {
    setIsMoveIn(true);
  };
  const onIsMoveInRef = useOutsideClick(() => onCloseMoveInModal());

  // move out process modal open, close ans onref
  const onCloseMoveOutProcessModal = () => {
    setIsMoveOut(false);
  };
  const onOpenMoveOutProcessModal = () => {
    setIsMoveOut(true);
  };
  const onMoveOutRef = useOutsideClick(() => onCloseMoveOutProcessModal());

  const { createLoad } = useSelector(selectMaintanace);
  const { yourProperty, deleteLoad } = useSelector(selectBook);

  useEffect(() => {
    dispatch(getYourRentProperty());
  }, [dispatch, createLoad, deleteLoad]);

  const onPaid = (method) => {
    const today = new Date();
    const endRent = addDaysToDate(today, 30);
    const transactionID = createTransactionId(method);
    const property = yourProperty[0];
    dispatch(
      paidRentProperty({
        bookingId: property.id,
        propertyId: property.propertyId,
        endDate: endRent,
        paymentMethod: method,
        transactionId: transactionID,
        amount: property.rentAmount,
      })
    );
    toast.success('Paid rent successfully');
  };

  const handleReqCanclellation = (id) => {
    dispatch(requestCancellation(id));
    onCloseCancleModal();
    toast.success('Request sent successfully');
  };

  if (!yourProperty || Object.keys(yourProperty).length === 0) {
    return (
      <div
        style={{
          minHeight: '100vh',
        }}
      >
        <MenuHeader />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
            flexDirection: 'column',
          }}
        >
          <Loading />
          <div style={{ marginTop: '4rem' }}>
            <Link to="/">👉 Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const [property] = yourProperty;

  const { endDate, startDate } = property;

  const takeOverKeyDate = formatDateWithLong(
    addDaysToDate(new Date(startDate), 3)
  );

  const left3DaysOrPassDueDate = isEventInThreeDaysOrPassed(new Date(endDate));
  const moveinStartedDate = formatDateWithLong(
    addDaysToDate(new Date(startDate), 1)
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

  const isReq = property?.isIssue;
  const isCanclellation = property?.isCanclellation;
  const dayMoveInStep = property.startDate && daysPassed(new Date(startDate));
  const dayMoveOutStep =
    property.startDate &&
    daysPassed(new Date(property.cancellationRequestedAt));
  const isMove = property?.isMoveIn && dayMoveInStep < 7;

  // no canclellation time if stared day minus the current day is less then 15
  const noCanclellationTime = dayMoveInStep < 15;

  // reqStatus 'pending', 'completed', 'rejected' and give  colors
  const reqStatus = {
    pending: '#ff9900', // Sky Blue
    requested: '#ff9900', // Sky Blue
    completed: '#2ecc71', // Green
    rejected: '#e74c3c', // Red
  };

  // check if property request is 3 request that not completed
  // if it is 3 request that not completed then disable the request button
  const is3Request = property?.maintenanceStatuses
    ?.split(',')
    .filter((item) => item !== 'completed').length;

  return (
    <div>
      <MenuHeader />

      <div style={{ minHeight: '20vh' }}>
        {yourProperty.length !== 0 &&
        typeof yourProperty == 'object' &&
        dayMoveOutStep < 5 ? (
          <>
            <h1
              style={{
                textAlign: 'center',
                margin: '4rem 0rem',
                marginTop: '5rem',
                fontSize: '3rem',
                fontWeight: 'bold',
              }}
            >
              Your Rent Home
            </h1>
            <div
              className="row--1"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                minHeight: '80vh',
                marginBottom: '5rem',
              }}
            >
              {!property?.isMoveIn && (
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
                            , upon receipt of your complete application, our
                            team will conduct a thorough review process, which
                            typically takes approximately{' '}
                            <span style={{ fontWeight: 'bold' }}>
                              one business days.
                            </span>{' '}
                            We understand your eagerness to find a new home, and
                            we appreciate your patience during this time. We
                            will contact you directly via phone or email with an
                            update on your application status within this
                            timeframe. but if you prefer to be reached by email,
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

              {dayMoveInStep > 4 && property?.isConfirm !== 0 && (
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
                          <p style={{ fontWeight: 'bold' }}>
                            {property.landLordId}
                          </p>
                        </div>
                        <div style={{ display: 'flex', margin: '1rem 0' }}>
                          <h1 style={{ marginRight: '1rem' }}>Owner Name:</h1>
                          <p style={{ fontWeight: 'bold' }}>
                            {property.landLordFirstName}{' '}
                            {property.landLordLastName}
                          </p>
                        </div>
                        <div style={{ display: 'flex', margin: '1rem 0' }}>
                          <h1 style={{ marginRight: '1rem' }}>
                            Owner Contact:
                          </h1>
                          <p style={{ fontWeight: 'bold' }}>
                            {property.landLordPhone}
                          </p>
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
                          <h1 style={{ marginRight: '1rem' }}>
                            Payment Status:
                          </h1>
                          <p style={{ fontWeight: 'bold' }}>Paid</p>
                        </div>

                        <div style={{ display: 'flex', margin: '1rem 0' }}>
                          <h1 style={{ marginRight: '1rem' }}>
                            Payment Start:
                          </h1>
                          <p style={{ fontWeight: 'bold' }}>
                            {formatDateWithLong(new Date(startDate))}
                          </p>
                        </div>
                        <div style={{ display: 'flex', margin: '1rem 0' }}>
                          <h1 style={{ marginRight: '1rem' }}>Payment Due:</h1>
                          <p style={{ fontWeight: 'bold' }}>
                            {formatDateWithLong(new Date(endDate))}
                          </p>
                        </div>
                        <div style={{ display: 'flex', margin: '1rem 0' }}>
                          <h1 style={{ marginRight: '1rem' }}>Key TakeOver:</h1>
                          <p style={{ fontWeight: 'bold' }}>
                            {takeOverKeyDate}
                          </p>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                          <CustomButton
                            label="Req. Maintenance"
                            style={{ marginRight: '2rem', width: '100%' }}
                            onClick={onOpenReqMainModal}
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
                            onClick={onOpenCheckModal}
                            disabled={!left3DaysOrPassDueDate}
                          />
                          <CustomButton
                            label="Cancle"
                            color={'#E47675'}
                            onClick={onOpenCancleModal}
                            style={{ width: '46%' }}
                            disabled={noCanclellationTime}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Move in Process and Req Maintenance Process */}
              {(isReq || isMove || isCanclellation !== 0) && (
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
                              <p
                                style={{ marginTop: '1rem', lineHeight: '1.5' }}
                              >
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
                                onClick={onOpenMoveInModal}
                                color={'#FF4500'}
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
                                  <h1 style={{ marginRight: '1rem' }}>
                                    Status:
                                  </h1>
                                  <p
                                    style={{
                                      fontWeight: 'bold',
                                      border: `1px solid ${
                                        cancleStatus[
                                          property.cancellationStatus
                                        ]
                                      }`,
                                      padding: '1rem 3rem',
                                      // transform: 'translatex(-2rem)',
                                      color:
                                        cancleStatus[
                                          property.cancellationStatus
                                        ],
                                    }}
                                  >
                                    {capitalize(property.cancellationStatus)}
                                  </p>
                                </div>
                              )}

                            {dayMoveOutStep === 0 && (
                              <p
                                style={{ marginTop: '1rem', lineHeight: '1.5' }}
                              >
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
                                onClick={onOpenMoveOutProcessModal}
                                color={'purple'}
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
                                            property.maintenanceStatuses.split(
                                              ','
                                            )[index]
                                          ],
                                        paddingLeft: '1rem',
                                        margin: '0rem 1rem',
                                      }}
                                    >
                                      {
                                        property.maintenanceStatuses.split(',')[
                                          index
                                        ]
                                      }
                                    </td>
                                    <td>
                                      {formatDate(
                                        new Date(
                                          property.maintenanceExpectedDates.split(
                                            ','
                                          )[index]
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

              {dayMoveInStep > 4 &&
                property?.isConfirm !== 0 &&
                yourProperty.map((property) => (
                  <>
                    {console.log(property)}
                    <Link
                      to={`/propertyDetails/${property.propertyId}`}
                      key={property.id}
                      className="link"
                    >
                      <PropertyItem item={property} key={property.id} />
                    </Link>

                    <CheckoutModal
                      isCheckout={isCheckout}
                      onModalRef={onModalRef}
                      onPay={onPaid}
                      onCloseCheckModal={onCloseCheckModal}
                      modalWidth="30rem"
                      item={property}
                      rentPaid={true}
                    />
                  </>
                ))}

              <DeleteModal
                isDelete={isCancle}
                onClose={onCloseCancleModal}
                onDelete={() => handleReqCanclellation(property.id)}
                onModalRef={onRef}
                table="Book Or [Cancle Rent]"
              />

              <ReqMaintanceModal
                onCloseReqMaintanceModal={onCloseReqMainModal}
                onModalRef={onReqMainRef}
                isCheckout={isReqMain}
                modalWidth="30rem"
                item={property}
              />
              <MoveInProcessModal
                isMoveInProcess={isMoveIn}
                onClose={onCloseMoveInModal}
                onModalRef={onIsMoveInRef}
                onDay={dayMoveInStep}
                steps={moveInProcessSteps}
                title="House Move-In Process "
              />
              <MoveInProcessModal
                isMoveInProcess={isMoveOut}
                onClose={onCloseMoveOutProcessModal}
                onModalRef={onMoveOutRef}
                onDay={dayMoveOutStep}
                steps={moveOutProcessSteps}
                title="House Move-Out Process"
              />
            </div>
          </>
        ) : (
          <div
            style={{
              minHeight: '100vh',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
              }}
            >
              <img src={emptyHouse} style={{ width: '35rem', opacity: '.5' }} />
              <div style={{ marginTop: '0rem' }}>
                <h1 style={{ fontSize: '2rem' }}>No Property Found</h1>
              </div>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default YourHome;
