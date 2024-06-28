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
import {
  addDaysToDate,
  createTransactionId,
  daysPassed,
} from '../../utils/helperFunction';
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
import NotConfirm from '../../components/YourHome/NotConfirm';
import YourRentHomeInfo from '../../components/YourHome/YourRentHomeInfo';
import In_Out_ReqMain_Process from '../../components/YourHome/In_Out_ReqMain_Process';
import CustomEmptyHouse from '../../components/Custom/CustomEmptyHouse';
import YourRentTransactions from '../../components/YourHome/YourRentTransactions';
import {
  getPaymentsByTenant,
  selectPayment,
} from '../../store/slices/paymentSlice';

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
  const { yourProperty, deleteLoad, paidLoad } = useSelector(selectBook);

  useEffect(() => {
    dispatch(getYourRentProperty());
  }, [dispatch, createLoad, deleteLoad, paidLoad]);

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
        securityDeposit: 0.0,
      })
    );
    toast.success('Paid rent successfully');
  };

  const [property] = yourProperty;

  console.log('property home', yourProperty);

  const handleReqCanclellation = (id) => {
    dispatch(requestCancellation(id));
    onCloseCancleModal();
    toast.success('Request sent successfully');
  };

  useEffect(() => {
    if (property) dispatch(getPaymentsByTenant(property.tenantId));
  }, [dispatch, property]);

  const { myPayments } = useSelector(selectPayment);

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

  const { startDate } = property;

  const isReq = property?.isIssue;
  const isCanclellation = property?.isCanclellation;
  const dayMoveInStep = property.startDate && daysPassed(new Date(startDate));
  const dayMoveOutStep =
    property.startDate &&
    daysPassed(new Date(property.cancellationRequestedAt));

  const isMove = property?.isMoveIn && dayMoveInStep < 7;

  // Is move day
  const isMoveDay = dayMoveInStep > 1 && property?.isConfirm;

  // Is process [Movein - Moveout - Req Maintenance]
  const isProcess = isReq || isMove || isCanclellation !== 0;

  return (
    <div>
      <MenuHeader />

      <div style={{ minHeight: '20vh' }}>
        {yourProperty.length !== 0 && typeof yourProperty == 'object' ? (
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
              <NotConfirm
                isConfirm={!property?.isMoveIn}
                currentUser={currentUser}
              />

              <YourRentHomeInfo
                property={property}
                isMoveDay={isMoveDay}
                onOpenCancle={onOpenCancleModal}
                onOpenReqMain={onOpenReqMainModal}
                onOpenCheck={onOpenCheckModal}
              />

              {/* Move in Process and Req Maintenance Process */}
              <In_Out_ReqMain_Process
                isProcess={isProcess}
                onOpenMoveIn={onOpenMoveInModal}
                onOpenMoveOut={onOpenMoveOutProcessModal}
                property={property}
              />

              {dayMoveInStep > 1 &&
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
                  </>
                ))}

              <CheckoutModal
                isCheckout={isCheckout}
                onModalRef={onModalRef}
                onPay={onPaid}
                onCloseCheckModal={onCloseCheckModal}
                modalWidth="30rem"
                item={property}
                rentPaid={true}
              />
              <DeleteModal
                isDelete={isCancle}
                onClose={onCloseCancleModal}
                onDelete={() => handleReqCanclellation(property.id)}
                onModalRef={onRef}
                pragraphe="Are you sure you want to cancel this house? This action cannot be undone."
                title="Cancel House"
                type="UnRent"
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
          <CustomEmptyHouse />
        )}

        <YourRentTransactions
          isMoveDay={isMoveDay}
          property={property}
          payments={myPayments}
        />
      </div>
    </div>
  );
};

export default YourHome;
