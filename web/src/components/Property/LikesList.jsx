// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import PropertyItem from './PropertyItem';
import { Link } from 'react-router-dom';
import MenuHeader from '../Header/MenuHeader';
import NoPropertyFound from '../../pages/NoPropertyFound';

const LikesList = () => {
  const likeList = JSON.parse(localStorage.getItem('likes'));

  return (
    <>
      <MenuHeader />

      <h1
        style={{
          marginLeft: '6rem',
          fontSize: '3rem',
          fontWeight: 'bold',
          marginTop: '5rem',
        }}
      >
        Your likes this properties
      </h1>

      <div style={{ height: '4rem' }}></div>
      {likeList?.length === 0 || !likeList? (
        <NoPropertyFound />
      ) : (
        <>
          <div className="row" style={{ minHeight: '70vh' }}>
            {likeList &&
              likeList.map((property) => (
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
        </>
      )}
    </>
  );
};

export default LikesList;
