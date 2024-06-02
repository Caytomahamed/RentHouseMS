// eslint-disable-next-line no-unused-vars
import React from 'react';
// import Button from '@mui/material/Button';
import CustomButton from '../Custom/CustomButton';
import { NavLink, Link } from 'react-router-dom';

const Discover = () => {
  return (
    <div className="discover main__box">
      <h1 style={{ color: '#E47675' }}>Discover Renter Experiences</h1>
      <div className="composition">
        <div className="composition__left">
          <div className="composition__left--info">
            <h1>Post your house and get a client</h1>

            {/* <Link
              to="/signup"
              style={{ textDecoration: 'none' }}
              state={{ type: 'landlord' }}
            > */}
            <CustomButton
              label="Get a client"
              color={'#E47675'}
              style={{ padding: '1.5rem 2rem' }}
            />
            {/* </Link> */}
          </div>
        </div>
        <div className="composition__right">
          <div className="composition__left--info">
            <h1>Get a home , Rent and enjoyed</h1>
            <NavLink to="/propertyList" className="link">
              <CustomButton
                label="Rent a house"
                color={'#E47675'}
                style={{ padding: '1.5rem 2rem' }}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
