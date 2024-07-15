// eslint-disable-next-line no-unused-vars
import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 border-top">
      <div className="cards">
        <div className="cards__item">
          <div>
            <h3>Renter</h3>
            <a href="#">Home</a>
            <a href="#">RentItem</a>
            <a href="#">Profile</a>
          </div>
        </div>
        <div className="cards__item">
          <div>
            <h3>About Us</h3>
            <a href="#">Aim</a>
            <a href="#">Vision</a>
            <a href="#">Testimonials</a>
          </div>
        </div>
        <div className="cards__item">
          <div>
            <h3>Contact us</h3>
            <a href="#">rent@gmail.com</a>
            <a href="#">+24550505005</a>
            <a href="#">facebook</a>
          </div>
        </div>

        <div className="cards__item">
          <div>
            <h3>Help</h3>
            <a href="#">Help@gmail.com</a>
            <a href="#">Office</a>
            <a href="#">Help</a>
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center' }}>Copyright &copy; kirodhow.com</p>
    </footer>
  );
};

export default Footer;
