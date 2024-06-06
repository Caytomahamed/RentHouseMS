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
  addFourDays,
  capitalize,
  createTransactionId,
  formatDateWithLong,
  isEventInThreeDaysOrPassed,
} from '../../utils/helperFunction';
import CustomButton from '../../components/Custom/CustomButton';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import CheckoutModal from '../../components/modols/CheckoutModal';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/modols/DeleteModal';

const YourHome = () => {
  const dispatch = useDispatch();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isCancle, setIsCancle] = useState(false);

  const onCloseCancleModal = () => {
    setIsCancle(false);
  };

  const onOpenCancleModal = () => {
    setIsCancle(true);
  };

  const onRef = useOutsideClick(() => onCloseCancleModal());

  const onCloseCheckModal = () => {
    setIsCheckout(false);
  };

  const onOpenCheckModal = () => {
    setIsCheckout(true);
  };

  const onModalRef = useOutsideClick(() => onCloseCheckModal());

  useEffect(() => {
    dispatch(getYourRentProperty());
  }, [dispatch]);

  const { yourProperty } = useSelector(selectBook);

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

  const takeOverKeyDate = formatDateWithLong(addFourDays(new Date(startDate)));

  const left3DaysOrPassDueDate = isEventInThreeDaysOrPassed(new Date(endDate));

  const cancleStatus = {
    requested: '#9b59b6', // Amber
    in_progress: '#3498db', // Sky Blue
    finalizing: '#9b59b6', // Purple
  };

  return (
    <div>
      <MenuHeader />

      <div style={{ minHeight: '40vh' }}>
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
              {yourProperty.map((property) => (
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
                    rentPaid={'true'}
                  />
                </>
              ))}

              <DeleteModal
                isDelete={isCancle}
                onClose={onCloseCancleModal}
                onDelete={() => handleReqCanclellation(property.id)}
                onModalRef={onRef}
                table="Book Or [Cancle Rent] "
              />
              <div
                className="col-1-of-3"
                data-id="11"
                style={{ marginTop: '0rem', marginLeft: '5rem' }}
              >
                <div className="card" data-id="11">
                  <div
                    className="card__side card__side--front"
                    style={{ padding: '1.5rem' }}
                  >
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
                        <h1 style={{ marginRight: '1rem' }}>Payment status:</h1>
                        <p style={{ fontWeight: 'bold' }}>Paid</p>
                      </div>

                      <div style={{ display: 'flex', margin: '1rem 0' }}>
                        <h1 style={{ marginRight: '1rem' }}>Payment start:</h1>
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
                        <p style={{ fontWeight: 'bold' }}>{takeOverKeyDate}</p>
                      </div>

                      {property.cancellationStatus &&
                        property.cancellationStatus !== 'completed' && (
                          <div
                            style={{
                              display: 'flex',
                              margin: '0',
                              marginTop: '1.5rem',
                            }}
                          >
                            <h1 style={{ marginRight: '0rem' }}>
                              Cancellation status:
                            </h1>
                            <p
                              style={{
                                fontWeight: 'bold',
                                border: `1px solid ${
                                  cancleStatus[property.cancellationStatus]
                                }`,
                                padding: '1.3rem 2rem',
                                transform: 'translatex(-2rem)',
                                color:
                                  cancleStatus[property.cancellationStatus],
                              }}
                            >
                              {capitalize(property.cancellationStatus)}
                            </p>
                          </div>
                        )}

                      <div style={{ marginTop: '2rem' }}>
                        <CustomButton
                          label="Req. Maintenance"
                          style={{ marginRight: '2rem', width: '100%' }}
                          onClick={onOpenCancleModal}
                          color={' #ff9900'}
                        />
                      </div>

                      <h1
                        style={{
                          margin: '2rem 0rem',
                          fontSize: '1.8rem',
                          fontWeight: 'bold',
                          marginTop: '3rem',
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
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default YourHome;
