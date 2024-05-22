// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/slices/auth';

import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    firstname: 'cali',
    lastname: 'maxamed',
    email: 'calimaxamed@gmail.com',
    phone: '2424242',
    state: 'maroodi jeex',
    city: 'haerad',
    address: 'digaale',
    birthday: '2021-09-09',
    password: '12345678',
    passwordConfirm: '12345678',
  });

  const type = location.state.type;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({ ...formData, roleName: type }));
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      state: '',
      city: '',
      address: '',
      birthday: '',
      password: '',
      passwordConfirm: '',
    });

    navigateTo('/');
  };

  return (
    <div className="login__form">
      <div className="login__form__logo">
        <img src={Logo} alt="no logo" />
      </div>
      <div style={{ display: 'flex', gap: '4rem' }}>
        <form>
          <h1>Create New Account</h1>
          <p>
            Already A Member? <Link to="/">Login now</Link>
          </p>
          <fieldset>
            <label htmlFor="firstname">
              <img src={Logo} alt="user" />
              <input
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="off"
                placeholder="Enter firstname *"
                value={formData.firstname}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="lastname">
              <img src={Logo} alt="user" />
              <input
                type="text"
                name="lastname"
                autoComplete="off"
                placeholder="Enter lastname *"
                value={formData.lastname}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              <img src={Logo} alt="email" />
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="phone">
              <img src={Logo} alt="lock icon" />
              <input
                type="number"
                name="phone"
                autoComplete="off"
                placeholder="Enter phone*"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="state">
              <img src={Logo} alt="lock icon" />
              <input
                type="text"
                name="state"
                autoComplete="off"
                placeholder="Enter state *"
                value={formData.state}
                onChange={handleChange}
              />
            </label>
          </fieldset>
        </form>
        <form>
          <fieldset>
            <label htmlFor="city">
              <img src={Logo} alt="lock icon" />
              <input
                type="text"
                name="city"
                autoComplete="off"
                placeholder="Enter city *"
                value={formData.city}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="address">
              <img src={Logo} alt="lock icon" />
              <input
                type="text"
                name="address"
                autoComplete="off"
                placeholder="Enter address *"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="birthday">
              <img src={Logo} alt="lock icon" />
              <input
                type="date"
                name="birthday"
                autoComplete="off"
                placeholder="Enter birthday*"
                value={formData.birthday}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              <img src={Logo} alt="lock icon" />
              <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Enter password*"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="passwordConfirm">
              <img src={Logo} alt="lock icon" />
              <input
                type="password"
                name="passwordConfirm"
                autoComplete="off"
                placeholder="Enter passwordConfirm*"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <input
            type="submit"
            name="Register"
            id="submit"
            value="Register"
            onClick={handleSubmit}
          />
        </form>
      </div>

      <div className="circle--1"></div>
      <div className="circle--2"></div>
    </div>
  );
};

export default SignUp;
