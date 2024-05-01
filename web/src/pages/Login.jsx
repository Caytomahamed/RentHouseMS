// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Login.css';
import Logo from '../assets/images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Replace with your actual login logic (API call, authentication server, etc.)
    try {
      // Simulate a successful login with dummy credentials
      if (email === 'admin@gmail.com' && password === '12345678') {
        localStorage.setItem('isLoggedIn', true);
        alert('Login successful!');
        // Redirect to the home page or desired route
        window.location.reload();
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login');
    }
  };
  return (
    <div className="login__form">
      <div className="login__form__logo">
        <img src={Logo} alt="no logo" />
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p>Enter your credentials to acces your account</p>

        <fieldset>
          <label>
            <img src={Logo} alt="email icon" />
            <input
              type="text"
              name="email"
              id="email"
              //   autocomplete="off"
              autoCorrect="off"
              autoComplete="off"
              placeholder="Enter your email *"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <img src={Logo} alt="lock icon" />
            <input
              autoComplete="off"
              type="password"
              name="password"
              placeholder="Enter your password *"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </fieldset>
        <input
          type="submit"
          name="Login"
          id="submit"
          disabled={!email || !password}
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
