// eslint-disable-next-line no-unused-vars
import React from 'react';
import Logo from '../../assets/images/logo.png';
const Banner = () => {
  return (
    <div className="banner">
      <div className="logo">
        <img src={Logo} />
      </div>
      <div className="banner__info ">
        <h1>
          <span style={{ color: '#E47675' }}>kiro dhow</span> Your Modern Rental
          Solution
        </h1>
        <h5>
          Manage listings, applications, maintenance requests, and more - all in one place.
        </h5>
      </div>
    </div>
  );
};

export default Banner;
