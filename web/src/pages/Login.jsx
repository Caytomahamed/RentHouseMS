// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Login.css';
import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    email: 'me@gmail.com',
    password: 'qwertyu',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // window.location = 'http://localhost:5173/';
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   dispatch(login(formData));
  //   setFormData({
  //     email: '',
  //     password: '',
  //   });
  //   // TODO: Replace with your actual login logic (API call, authentication server, etc.)
  //   // try {
  //   //   // Simulate a successful login with dummy credentials
  //   //   if (email === 'admin@gmail.com' && password === '12345678') {
  //   //     localStorage.setItem('isLoggedIn', true);
  //   //     alert('Login successful!');
  //   //     // Redirect to the home page or desired route
  //   //     window.location.reload();
  //   //   } else {
  //   //     alert('Invalid email or password');
  //   //   }
  //   // } catch (error) {
  //   //   console.error(error);
  //   //   alert('An error occurred during login');
  //   // }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
    setFormData({
      email: '',
      password: '',
    });
    navigateTo('/');
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
          className="btn"
          style={{ textTransform: 'capitalize' }}
        />
      </form>
      <div className="circle--1"></div>
      <div className="circle--2"></div>
    </div>
  );
}

export default Login;
