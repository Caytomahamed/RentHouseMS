// eslint-disable-next-line no-unused-vars
import React from 'react';
// import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import CustomButton from '../Custom/CustomButton';

const RentNow = () => {
  return (
    <div className="rent__now">
      <div className="rent__now__info">
        <h1 style={{ color: '#E47675' }}>Rent Renter for an item </h1>
        <NavLink to="/propertyList" className="link">
          <CustomButton
            label=" Rent Now"
            color={'#E47675'}
            style={{ padding: '1.5rem 2rem', marginTop: '3rem' }}
          />
        </NavLink>
      </div>
      <div className="rent__now__images">
        <img
          src="https://images.pexels.com/photos/286744/pexels-photo-286744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="img"
          className="images image-1  shadow"
        />
        <img
          src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="img"
          className="images image-2  shadow"
        />
        <img
          src="https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="img"
          className="images image-3  shadow"
        />
      </div>
    </div>
  );
};

export default RentNow;
