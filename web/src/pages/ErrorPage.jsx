// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ErrorPage.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-heading">Oops!</h1>
      <p className="error-message">Sorry, an unexpected error has occurred.</p>
      <h3 className="not-found">Not Found</h3>
      {/* <Link to="/"> 👉Home</Link> */}
    </div>
  );
};

export default ErrorPage;
