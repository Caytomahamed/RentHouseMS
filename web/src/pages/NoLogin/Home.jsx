// eslint-disable-next-line no-unused-vars
import React from 'react';
import Banner from '../../components/Banner/Banner';
import Discover from '../../components/Discover/Discover';
import BecomeLandlord from '../../components/BecomeLandlord/BecomeLandlord';
import RentNow from '../../components/RentNow/RentNow';
import MenuHeader from '../../components/Header/MenuHeader';

export const Home = () => {
  return (
    <>
      <MenuHeader />
      <Banner />
      <Discover />
      <RentNow />
      <BecomeLandlord />

      {/* <div style={{ fontSize: '4rem', textAlign: 'cemter' }}>
        Home
        <button
          style={{
            margin: '4rem',
            padding: '4rem',
            backgroundColor: 'blue',
            color: 'wheat',
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div> */}
    </>
  );
};
