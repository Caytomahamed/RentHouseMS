// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperty, selectProperties } from '../../store/slices/schedules';
import { Link, useParams } from 'react-router-dom';
import LandLordProperty from './LandLordProperty';
import {
  calculateDateAfter35Days,
  capitalize,
  createTransactionId,
} from '../../utils/helperFunction';
import RentPropertyNow from './RentPropertyNow';
import bedIcon from '../../assets/icons/bed.svg';
import bathIcon from '../../assets/icons/bath.svg';
import qualityIcon from '../../assets/icons/quality.svg';
import areaIcon from '../../assets/icons/area.svg';
import activeIcon from '../../assets/icons/active.svg';
import PropertyMap from './PropertyMap';
import MenuHeader from '../Header/MenuHeader';
import Loading from '../Custom/Loading';
import { rentProperty } from '../../store/slices/boookSlice';
import { toast } from 'react-toastify';

const PropertyDetails = () => {
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperty(+params.id));
  }, [dispatch, params.id]);

  const { property } = useSelector(selectProperties);

  if (!property || Object.keys(property).length === 0) {
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
            <Link to="/"> 👉Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const img_url = `http://localhost:9000/uploads/${
    JSON.parse(property.imageUrls)[0]
  }`;
  const img_url1 = `http://localhost:9000/uploads/${
    JSON.parse(property.imageUrls)[1]
  }`;
  const img_url2 = `http://localhost:9000/uploads/${
    JSON.parse(property.imageUrls)[2]
  }`;

  const img = img_url.replace(/['"]+/g, '');
  const img1 = img_url1.replace(/['"]+/g, '');
  const img2 = img_url2.replace(/['"]+/g, '');

  const type = capitalize(property.propertyType);

  const handleRentNow = (method) => {
    const endRent = calculateDateAfter35Days();
    const transactionID = createTransactionId(method);
    dispatch(
      rentProperty({
        propertyId: property.id,
        endDate: endRent,
        securityDeposit: property.rentAmount * 0.5,
        amount:
          property.rentAmount +
          property.rentAmount * 0.5 +
          property.rentAmount * 0.1,
        status: 'completed',
        paymentMethod: method,
        transactionId: transactionID,
      })
    );

    toast.success('property update successfully');
  };
  return (
    <>
      <MenuHeader />
      <div className="propertydetails">
        <section className="propertydetails__header">
          <h1>
            {type} {property.landLordFirstName}
          </h1>
          <div>
            <h4>
              {property.state},{property.city}, {property.address}
            </h4>
          </div>
        </section>

        <section className="propertydetails__images">
          <div className="propertydetails__images__main">
            <img src={img} alt="main" />
          </div>
          <div className="propertydetails__images__subs">
            <img src={img1} alt="sub" />
            <img src={img2} alt="sub" />
          </div>
        </section>

        <section className="propertydetails__info">
          {/* <h3 className="propertdetails__info__title">Description</h3>
        <p className="propertdetails__info__description">
          {property.description}
        </p> */}
          <div className="propertydetails__info__details">
            <div className="propertydetails__info__details__property">
              <div className="propertydetails__info__details__property__type">
                <h1>Bedrooms</h1>
                <div className="icon">
                  <img src={bedIcon} alt="bedicon" />
                  <h1>{property.bedrooms}</h1>
                </div>
              </div>
              <div className="propertydetails__info__details__property__type">
                <h1>Bathrooms</h1>
                <div className="icon">
                  <img src={bathIcon} alt="bedicon" />
                  <h1>{property.bathrooms}</h1>
                </div>
              </div>
              <div className="propertydetails__info__details__property__type">
                <h1>Squear Area</h1>
                <div className="icon">
                  <img src={areaIcon} alt="bedicon" />
                  <h1>{property.squareFootage}f</h1>
                </div>
              </div>
              <div className="propertydetails__info__details__property__type">
                <h1>Repair Quality</h1>
                <div className="icon">
                  <img src={qualityIcon} alt="bedicon" />
                  <h1>Modern loft</h1>
                </div>
              </div>
              <div className="propertydetails__info__details__property__type">
                <h1>status</h1>
                <div className="icon">
                  <img src={activeIcon} alt="bedicon" />
                  <h1>Active</h1>
                </div>
              </div>
            </div>
            <div className="propertydetails__info__details__description">
              <h1>About this home</h1>
              <p>
                Discover a cozy haven in this charming
                <b> {property.bedrooms}</b>
                -bedroom, two-bathroom home nestled in a serene neighborhood. A
                welcoming living space with a fireplace sets the tone for cozy
                gatherings, while the chef's kitchen and dining area offer
                modern convenience and a lovely view of the lush backyard. The
                master suite provides a private retreat, complemented by{' '}
                <b>{property.bathrooms} </b> additional bedrooms for
                versatility. Outside, a peaceful patio surrounded by nature
                invites relaxation and outdoor enjoyment. With its convenient
                location near amenities, this home blends comfort and
                convenience for a delightful living experience.
              </p>
            </div>
            <div className="propertydetails__info__details__landlord">
              {/* <LandLordProperty data={selectedItem} /> */}
            </div>

            <div className="propertydetails__info__details__map">
              <h1>Where you’ll be</h1>
              <PropertyMap item={property} />
            </div>
          </div>

          <div className="propertydetails__info__book">
            <RentPropertyNow item={property} onRent={handleRentNow} />
            <LandLordProperty data={property} />
          </div>
        </section>
      </div>
    </>
  );
};

export default PropertyDetails;
