// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import MenuHeader from '../../components/Header/MenuHeader';
// import PropertyList from '../../components/Property/PropertyList';
import { useDispatch, useSelector } from 'react-redux';
import { getYourRentProperty, selectBook } from '../../store/slices/boookSlice';
import Loading from '../../components/Custom/Loading';
import { Link } from 'react-router-dom';
import PropertyItem from '../../components/Property/PropertyItem';
import emptyHouse from '../../assets/images/emptyhouse.jpg';
import { formatDate } from '../../utils/helperFunction';

const YourHome = () => {
  const dispatch = useDispatch();

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

  return (
    <div>
      <MenuHeader />
      <div style={{ minHeight: '40vh' }}>
        {yourProperty.length !== 0 && typeof yourProperty == 'object' ? (
          <>
            <h1
              style={{
                textAlign: 'center',
                marginTop: '4rem',
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
                <Link
                  to={`/propertyDetails/${property.propertyId}`}
                  key={property.id}
                  className="link"
                >
                  <PropertyItem item={property} key={property.id} />
                </Link>
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
                    <div>
                      <div style={{ display: 'flex', margin: '1rem 2rem' }}>
                        <h1 style={{ marginRight: '1rem' }}>Payment status:</h1>
                        <p style={{ fontWeight: 'bold' }}>Paid</p>
                      </div>
                      <div style={{ display: 'flex', margin: '1rem 2rem' }}>
                        <h1 style={{ marginRight: '1rem' }}>Payment Due:</h1>
                        <p style={{ fontWeight: 'bold' }}>
                          {formatDate(Date.now())}
                        </p>
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
                // minWidth: '10ovw',
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
