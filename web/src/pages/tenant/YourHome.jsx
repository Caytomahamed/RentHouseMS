// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import MenuHeader from '../../components/Header/MenuHeader';
// import PropertyList from '../../components/Property/PropertyList';
import { useDispatch, useSelector } from 'react-redux';
import { getYourRentProperty, selectBook } from '../../store/slices/boookSlice';
import Loading from '../../components/Custom/Loading';
import { Link } from 'react-router-dom';
import PropertyItem from '../../components/Property/PropertyItem';
import emptyHouse from '../../assets/images/emptyhouse.jpg';
import { addFourDays, formatDateWithLong } from '../../utils/helperFunction';
import CustomButton from '../../components/Custom/CustomButton';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import CheckoutModal from '../../components/modols/CheckoutModal';

const YourHome = () => {
  const dispatch = useDispatch();
  const [isCheckout, setIsCheckout] = useState(false);

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
                    // onPay={onRent}
                    onCloseCheckModal={onCloseCheckModal}
                    modalWidth="30rem"
                    item={property}
                  />
                </>
              ))}

              <div
                className="col-1-of-3"
                data-id="11"
                style={{ marginTop: '8rem', marginLeft: '5rem' }}
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
                        <h1 style={{ marginRight: '1rem' }}>key takeover:</h1>
                        <p style={{ fontWeight: 'bold' }}>{takeOverKeyDate}</p>
                      </div>
                      <div style={{ marginTop: '2rem' }}>
                        <CustomButton
                          label="Paid Rent"
                          style={{ marginRight: '2rem' }}
                          onClick={onOpenCheckModal}
                        />
                        <CustomButton label="Cancle" color={'#E47675'} />
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
