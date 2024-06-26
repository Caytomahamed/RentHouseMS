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

// eslint-disable-next-line react/prop-types
const ViewBookModel = ({ isView, onClose, onRef }) => {
  const dispatch = useDispatch();
  const { selectItem } = useSelector(selectProperties);
  const [isMove, setIsMove] = useState(false);

  console.log('Move', selectItem);
  const img_url =
    Object.keys(selectItem).length > 0 &&
    `http://localhost:9000/uploads/${JSON.parse(selectItem?.imageUrls)[0]}`;

  // landlord and tenant profile
  const ImageUrl =
    Object.keys(selectItem).length > 0 &&
    `http://localhost:9000/uploads/${JSON.parse(selectItem?.tenantImageUrl)}`;

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

  const moveIn = dayMoveInStep > 0 && dayMoveInStep < 8 ? true : false;
  const moveOut = dayMoveOutStep > 0 && dayMoveOutStep < 5 ? true : false;

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

  // console.log('Move', selectItem);
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
        amount: property.rentAmount,
        securityDeposit: property.rentAmount * 0.35,
      })
    );
    toast.success('Paid rent successfully');
  };

  console.log('sss', moveSteps);

  return (
    <>
      {isView && (
        <OverlayModal close={onClose} modalRef={onRef} width={60}>
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
              <img src={img_url} alt="img url" />
              <h1>First and Last name</h1>
              <p>example@gmail.com</p>
              <p>Phone: 44444444</p>
              <div className="divider"></div>
              <h1 className="title">About Tenant</h1>
              <img src={img_url} alt="img url" />
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
                      <CustomButton
                        label={`Process ${
                          moveIn ? 'in' : moveOut ? 'out' : null
                        }  details`}
                        style={{ marginTop: '1rem' }}
                        onClick={onOpenMoveModal}
                        color={'#FF4500'}
                      />
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

                  {!moveIn ||
                    (!moveOut && (
                      <div className="process">
                        <h1 className="title">About Status</h1>
                        <p>
                          {`Here is the current status for your rental property at

                          Property Address: ${selectItem?.address}
                          Paid Rent: ${paymentStatus?.amountPaid}
                          Due Date:${paymentStatus?.dueDate}
                          Days Left: ${paymentStatus?.daysLeft}

                          Please ensure all
                          necessary actions are taken before the due date. If
                          you have any questions or need assistance, feel free
                          to contact our support team.`}
                        </p>
                      </div>
                    ))}
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
