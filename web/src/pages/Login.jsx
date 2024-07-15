// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Login.css';
import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appSelectUsers, login } from '../store/slices/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loginError } = useSelector(appSelectUsers);

  const [formData, setFormData] = useState({
    email: 'me@gmail.com',
    password: '12345678',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
    setFormData({
      email: '',
      password: '',
    });

    toast.error(loginError);

    if (!loginError) {
      navigateTo('/');
      return;
    }
  };
  return (
    <div className="login__form">
      <div className="login__form__logo">
        <img src={Logo} alt="no logo" />
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p>
          No have acount?
          <Link to="/startCreateAccount"> Create now</Link>
        </p>

        <fieldset>
          <label>
            <img src={Logo} alt="email icon" />
            <input
              type="email"
              name="email"
              id="email"
              //   autocomplete="off"
              autoCorrect="off"
              autoComplete="off"
              placeholder="Enter your email *"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            <img src={Logo} alt="lock icon" />
            <input
              autoComplete="off"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <input
          type="submit"
          name="Login"
          id="submit"
          disabled={!formData.email || !formData.password}
          value="submit"
          style={{ textTransform: 'capitalize' }}
        />
      </form>
      <div className="circle--1"></div>
      <div className="circle--2"></div>
    </div>
  );
}

export default Login;
