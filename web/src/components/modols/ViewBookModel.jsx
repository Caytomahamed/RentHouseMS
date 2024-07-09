// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import OverlayModal from '../OverlayModal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectProperties } from '../../store/slices/schedules';
import PropertyItem from '../Property/PropertyItem';
import CustomButton from '../Custom/CustomButton';
import MoveInProcessModal from './MoveInProcessModal';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import moveInProcessSteps from '../../../config/moveInProcessSteps.json';
import moveOutProcessSteps from '../../../config/moveOutProcessSteps.json';
import {
  addDaysToDate,
  createTransactionId,
  daysPassed,
  formatDate,
  formatDateWithLong,
  formatRentalStatus,
} from '../../utils/helperFunction';
import { paidRentProperty } from '../../store/slices/boookSlice';
import { toast } from 'react-toastify';
import CheckoutModal from './CheckoutModal';
import { capitalize } from '@mui/material';
import defaultImgIcon from '../../assets/images/defaultImg.png';
import { appSelectUsers, getCurrentUser } from '../../store/slices/auth';
import { selectUsers } from '../../store/slices/userSlice';
import { uploadFolder } from '../../../config/config';

// eslint-disable-next-line react/prop-types
const ViewBookModel = ({ isView, onClose, onRef }) => {
  const dispatch = useDispatch();
  const { selectItem } = useSelector(selectProperties);
  const [isMove, setIsMove] = useState(false);

  // get current user[landlord]
  const { updateLoad } = useSelector(selectUsers);
  const { currentUser } = useSelector(appSelectUsers);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, updateLoad]);

  // landlord and tenant profile
  const tenantImgUrl = selectItem?.tenantImageUrl
    ? `${uploadFolder}/${selectItem?.tenantImageUrl}`
    : defaultImgIcon;
  const landLordImgUrl = currentUser?.imageUrl
    ? `${uploadFolder}/${currentUser?.imageUrl}`
    : defaultImgIcon;

  /// open modal;
  const onCloseMoveModal = () => setIsMove(false);
  const onOpenMoveModal = () => setIsMove(true);
  const onIsMoveRef = useOutsideClick(() => onCloseMoveModal());

  // check modal
  const [isCheck, setIsCheck] = useState(false);
  const onCloseCheckModal = () => setIsCheck(false);
  const onOpenCheckModal = () => setIsCheck(true);
  const onCheckRef = useOutsideClick(() => onCloseCheckModal());

  const dayMoveInStep =
    selectItem?.startDate && daysPassed(new Date(selectItem?.startDate));
  const dayMoveOutStep =
    selectItem?.startDate &&
    daysPassed(new Date(selectItem?.cancellationRequestedAt));

  const moveIn = dayMoveInStep >= 0 && dayMoveInStep < 7 ? true : false;
  const moveOut = dayMoveOutStep >= 0 && dayMoveOutStep < 5 ? true : false;

  'Move', selectItem;

  const moveinStartedDate = formatDateWithLong(
    addDaysToDate(new Date(selectItem?.startDate), 1)
  );
  const moveOutStartedDate = formatDateWithLong(
    addDaysToDate(new Date(selectItem?.cancellationRequestedAt), 1)
  );

  // moveStep if movein is true then moveInProcessSteps but if moveiOUt moveOutProcessSteps
  let moveSteps = moveIn
    ? moveInProcessSteps
    : moveOut
    ? moveOutProcessSteps
    : false;

  // ('Move', selectItem);
  const paymentStatus = formatRentalStatus(selectItem);

  const onPaid = (method) => {
    const today = new Date();
    const endRent = addDaysToDate(today, 30);
    const transactionID = createTransactionId(method);
    const property = selectItem;
    dispatch(
      paidRentProperty({
        bookingId: property.id,
        propertyId: property.propertyId,
        endDate: endRent,
        paymentMethod: method,
        transactionId: transactionID,
        amount: property.rentAmount + property.rentAmount * 0.05,
        securityDeposit: property.rentAmount * 0.35,
      })
    );
    toast.success('Paid rent successfully');
  };

  'sss', moveSteps;

  return (
    <>
      {isView && (
        <OverlayModal close={onClose} modalRef={onRef} width={60}>
          {dayMoveOutStep === 0 && (
            <p
              style={{
                marginTop: '1rem',
                lineHeight: '1.5',
                fontSize: '2rem',
                marginBlock: '2rem',
                color: '#FF4500',
              }}
            >
              The move out process will starte tomorrow
              <span style={{ fontWeight: 'bold' }}>
                {' '}
                [{' '}
                {formatDateWithLong(
                  new Date(selectItem.cancellationRequestedAt)
                )}
                ]
              </span>
              be ready
            </p>
          )}
          <div className="viewBookModel">
            <div className="left">
              <h1
                style={{
                  alignSelf: 'flex-start',
                  marginBottom: '2rem',
                  color: 'rgb(36, 56, 246)',
                }}
              >
                Rent Date {formatDate(selectItem?.startDate)}
              </h1>
              <h1 className="title">About Landlord </h1>
              <img src={landLordImgUrl} alt="img url" />
              <h1>
                {capitalize(currentUser?.firstname)}{' '}
                {capitalize(currentUser?.lastname)}
              </h1>
              <p>{currentUser?.email}</p>
              <p>Phone: {currentUser.phone}</p>
              <div className="divider"></div>
              <h1 className="title">About Tenant</h1>
              <img src={tenantImgUrl} alt="img url" />
              <h1>
                {capitalize(selectItem?.tenantFirstName)}{' '}
                {capitalize(selectItem?.tenantLastName)}
              </h1>
              <p>{selectItem?.tenantEmail}</p>
              <p>Phone: {selectItem.tenantPhone}</p>
            </div>
            <div className="right">
              <div className="displayItem">
                <PropertyItem item={selectItem} />
              </div>

              {moveSteps ? (
                <div className="process">
                  <h1 className="title">Process</h1>
                  <div>
                    {moveIn && (
                      <CustomButton
                        label="Paid rent in 1 month"
                        style={{ marginTop: '1rem' }}
                        onClick={onOpenCheckModal}
                        color={'rgb(76, 175, 80)'}
                      />
                    )}

                    {moveSteps && (
                      <div style={{ display: 'flex' }}>
                        <CustomButton
                          label={`Process ${
                            moveIn ? 'in' : moveOut ? 'out' : null
                          }  details`}
                          style={{ marginTop: '1rem' }}
                          onClick={onOpenMoveModal}
                          color={'#FF4500'}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="process">
                  {dayMoveInStep === 0 && (
                    <>
                      <h1 className="title">Move In</h1>
                      <p style={{ marginTop: '5px' }}>
                        Move In process start at tomorrow{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {' '}
                          [{moveinStartedDate}]
                        </span>
                      </p>
                    </>
                  )}
                  {dayMoveOutStep === 0 && (
                    <>
                      <h1 className="title">Move Out</h1>
                      <p style={{ marginTop: '5px' }}>
                        Move out process start at tomorrow{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {' '}
                          [{moveOutStartedDate}]
                        </span>
                      </p>
                    </>
                  )}
                  {selectItem.isReject === true && (
                    <>
                      <h1 className="title">Rejected</h1>
                      <p style={{ marginTop: '1rem' }}>
                        you have processed your request to reject the booking
                        for the property at {selectItem.address}.
                      </p>
                    </>
                  )}

                  {(!moveIn || !moveOut) && dayMoveInStep > 6 && (
                    <>
                      <h1 className="title">About Status</h1>
                      <p style={{ lineHeight: 1.2 }}>
                        Here is the current status for your rental property at
                        <br />
                        <br />
                        <span style={{ fontWeight: 'bold' }}>
                          Property Address: {selectItem?.address} <br />
                          Paid Rent: {paymentStatus?.amountPaid} <br />
                          Due Date: {paymentStatus?.dueDate} <br />
                          {paymentStatus?.daysLeft <= 0 ? (
                            <span>
                              Days Left: {Math.abs(paymentStatus?.daysLeft)}
                            </span>
                          ) : (
                            <span style={{ color: 'Red' }}>
                              Days Pass: {Math.abs(paymentStatus?.daysLeft)}
                            </span>
                          )}{' '}
                          <br />
                        </span>
                        <br />
                        Please ensure all necessary actions are taken before the
                        due date.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <CheckoutModal
            isCheckout={isCheck}
            onModalRef={onCheckRef}
            onPay={onPaid}
            onCloseCheckModal={onCloseCheckModal}
            modalWidth="30rem"
            item={selectItem}
            landLordPaid1month={true}
            rentPaid={true}
          />
          <MoveInProcessModal
            isMoveInProcess={isMove}
            onClose={onCloseMoveModal}
            onModalRef={onIsMoveRef}
            onDay={dayMoveInStep}
            steps={moveSteps}
            title={`House Move-${
              moveIn ? 'in' : moveOut ? 'out' : null
            } Process`}
          />
        </OverlayModal>
      )}
    </>
  );
};

ViewBookModel.propType = {
  isView: PropTypes.bool,
  onClose: PropTypes.func,
  onRef: PropTypes.func,
};

export default ViewBookModel;
