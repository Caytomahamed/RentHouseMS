// eslint-disable-next-line no-unused-vars
import React from 'react';
import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const StartCreateAccount = () => {
  return (
    <div className="login__form">
      <div className="login__form__logo">
        <img src={Logo} alt="no logo" />
      </div>
      <div style={{ display: 'flex', gap: '4rem' }}>
        <Link
          to="/signup"
          style={{ textDecoration: 'none' }}
          state={{ type: 'tenants' }}
        >
          <form className="startcreateAccount">
            <h1 className="gradient-text" style={{ fontSize: '3rem' }}>
              Tenant
            </h1>
            <ul className="description-list">
              <li>☑Rents property from landlord.</li>
              <li>☑Pays rent for property usage.</li>
              <li>☑Maintains property and follows terms.</li>
            </ul>
          </form>
        </Link>
        <Link
          to="/signup"
          style={{ textDecoration: 'none' }}
          state={{ type: 'landlord' }}
        >
          <form className="startcreateAccount1">
            <h1 className="gradient-text2" style={{ fontSize: '3rem' }}>
              Landlords
            </h1>
            <ul className="description-list">
              <li>☑Owns property rented out.</li>
              <li>☑Manages property-related tasks.</li>
              <li>☑Ensures compliance with regulations.</li>
            </ul>
          </form>
        </Link>
      </div>
    </div>
  );
};

export default StartCreateAccount;
