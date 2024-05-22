// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSchedules,
  selectFilteredAndSortedSchedule,
  selectSchedules,
} from '../../store/slices/schedules';
import Loading from '../Custom/Loading';
import PropertyItem from './PropertyItem';
import { Link } from 'react-router-dom';
import MenuHeader from '../Header/MenuHeader';
import Searching from '../searching/Searching';

const PropertyList = () => {
  const dispatch = useDispatch();
  // get properties
  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  const { isLoading } = useSelector(selectSchedules);

  const { paginatedList } = useSelector(selectFilteredAndSortedSchedule);

  // remove here the paginationList

  return (
    <>
      <MenuHeader />
      <Searching />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </div>
      ) : (
        <div
          className="row--1"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            minHeight: '80vh',
            marginBottom: '5rem',
          }}
        >
          {paginatedList.map((property) => (
            <Link
              to={`/propertyDetails/${property.id}`}
              key={property.id}
              className="link"
            >
              <PropertyItem item={property} key={property.id} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default PropertyList;
