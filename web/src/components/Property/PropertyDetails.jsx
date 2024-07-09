// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperty, selectProperties } from '../../store/slices/schedules';
import { Link, useParams } from 'react-router-dom';
import LandLordProperty from './LandLordProperty';
import {
  calculateDateAfter35Days,
  capitalize,
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
import {
  getAlreadyBooked,
  rentProperty,
  selectBook,
} from '../../store/slices/boookSlice';
import { toast } from 'react-toastify';
import {
  getReviewsByPropertyId,
  selectReviewCreateLoad,
  selectReviews,
} from '../../store/slices/reviewSlice';
import ReviewItem from '../Reviews/ReviewItem';
import { appSelectUsers, getCurrentUser } from '../../store/slices/auth';
import { uploadFolder } from '../../../config/config';

const PropertyDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperty(+params.id));
  }, [dispatch, params.id]);

  const { property } = useSelector(selectProperties);
  const { errorr } = useSelector(selectBook);
  const createLoad = useSelector(selectReviewCreateLoad);

  // useEffect(() => {
  //   dispatch(getReviewsByPropertyId(+params.id));
  // }, [dispatch, params.id, createLoad]);

  useEffect(() => {
    dispatch(getReviewsByPropertyId(+params.id));
  }, [dispatch, params.id, createLoad]);

  const reviewList = useSelector(selectReviews);

  // alreadybooked
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { currentUser } = useSelector(appSelectUsers);

  const { booked } = useSelector(selectBook);

  useEffect(() => {
    if (currentUser) dispatch(getAlreadyBooked(currentUser.id));
  }, [dispatch, currentUser]);

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

  const img_url = `${uploadFolder}/${JSON.parse(property.imageUrls)[0]}`;
  const img_url1 = `${uploadFolder}/${JSON.parse(property.imageUrls)[1]}`;
  const img_url2 = `${uploadFolder}/${JSON.parse(property.imageUrls)[2]}`;

  const img = img_url.replace(/['"]+/g, '');
  const img1 = img_url1.replace(/['"]+/g, '');
  const img2 = img_url2.replace(/['"]+/g, '');

  const type = capitalize(property.propertyType);

  const handleRentNow = () => {
    const endRent = calculateDateAfter35Days();
    // const transactionID = createTransactionId(method);
    dispatch(
      rentProperty({
        propertyId: property.id,
        endDate: endRent,
        amount:
          property.rentAmount +
          property.rentAmount * 0.35 +
          property.rentAmount * 0.05,
        status: 'pending',
      })
    );

    if (errorr) return toast.error(`${errorr}`);

    if (!errorr) toast.success('House rented successfully');
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
                gatherings, while the chef&apos;s kitchen and dining area offer
                modern convenience and a lovely view of the lush backyard. The
                master suite provides a private retreat, complemented by{' '}
                <b>{property.bathrooms} </b> additional bedrooms for
                versatility. Outside, a peaceful patio surrounded by nature
                invites relaxation and outdoor enjoyment. With its convenient
                location near amenities, this home blends comfort and
                convenience for a delightful living experience.
              </p>
            </div>

            <div className="propertydetails__info__details__map">
              <h1>Where you’ll be</h1>
              <PropertyMap item={property} />
            </div>

            {reviewList && (
              <>
                <h1
                  style={{
                    marginTop: '3rem',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    paddingBottom: '1.5rem',
                  }}
                >
                  {[...Array(1)].map((star, index) => {
                    return (
                      <span
                        key={index}
                        style={{
                          cursor: 'pointer',
                          fontSize: '4rem',
                          color: 'rgb(180, 105, 14)',
                        }}
                      >
                        &#9733;
                      </span>
                    );
                  })}
                  4.7 property rating * 383K ratings
                </h1>
                <div className="testimonial__container">
                  {reviewList.length > 0 &&
                    reviewList.map((item) => (
                      <ReviewItem review={item} key={item.id} />
                    ))}
                </div>
              </>
            )}
          </div>

          <div className="propertydetails__info__book">
            <RentPropertyNow
              item={property}
              onRent={handleRentNow}
              apply={booked && booked.id ? true : false}
            />
            <LandLordProperty data={property} />
          </div>
        </section>
      </div>
    </>
  );
};

export default PropertyDetails;
