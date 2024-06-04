// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchedules, selectProperties } from '../../store/slices/schedules';
import Loading from '../Custom/Loading';
import PropertyItem from './PropertyItem';
import { Link } from 'react-router-dom';
import MenuHeader from '../Header/MenuHeader';
import Searching from '../searching/Searching';
import NoPropertyFound from '../../pages/NoPropertyFound';

const PropertyList = () => {
  const dispatch = useDispatch();
  // get properties
  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  const { isLoading, list } = useSelector(selectProperties);

  return (
    <>
      <MenuHeader />
      <Searching />
      <div style={{ height: '4rem' }}></div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </div>
      ) : (
        <>
          {list.length > 0 && (
            <div className="row" style={{ minHeight: '70vh' }}>
              {list.map((property) => (
                <>
                  <Link
                    to={`/propertyDetails/${property.id}`}
                    key={property.id}
                    className="link"
                  >
                    <PropertyItem item={property} key={property.id} />
                  </Link>
                </>
              ))}
            </div>
          )}
        </>
      )}

      {list.length === 0 && <NoPropertyFound />}
    </>
  );
};

export default PropertyList;
