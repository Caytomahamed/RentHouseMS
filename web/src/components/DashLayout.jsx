// eslint-disable-next-line no-unused-vars
import React from 'react';
import Logo from '../assets/images/logo.png';
import profileImage from '../assets/images/person.jpg';

// menu
import Menu from './Menu';

// icons
import logoutIcon from '../assets/icons/logout.svg';
import profileIcon from '../assets/icons/profile-icon.svg';

// eslint-disable-next-line react/prop-types
const DashLayout = ({ children, title }) => {
  // const getRandomColor = () => {
  //   var letters = [
  //     'linear-gradient( to right bottom,  rgba(255, 185, 0, 0.85),  rgba(255, 119, 48, 0.85))',
  //     'linear-gradient(to right bottom,rgba(126, 213, 111, 0.85), rgba(40, 180, 133, 0.85))',
  //     'linear-gradient(to right bottom,rgba(41, 152, 255, 0.85),rgba(86, 67, 250, 0.85))',
  //     'linear-gradient(to right bottom,#c084fc,#581c87)',
  //     'linear-gradient(to right bottom,#f472b6,#701a75)',
  //     'linear-gradient(to right bottom, #fdba74,#c2410c)',
  //     'linear-gradient(to right bottom, #74ebd5,#acb6e5 )',
  //     'linear-gradient(to right bottom, #1cb5e0,#000046)',
  //     'linear-gradient(to right bottom, #cbb4d4,#20002c)',
  //   ];

  //   // Generate a random index
  //   const randomIndex = Math.floor(Math.random() * letters.length);

  //   // Get the random linear gradient
  //   const randomGradient = letters[randomIndex];

  //   // Extract the first color from the random gradient
  //   const match = randomGradient.match(/rgba?\([^)]+\)/);
  //   const firstColor = match ? match[0] : null;

  //   return firstColor;
  // };
  return (
    <section className="dashboard">
      <div className="dashboard__sidebar">
        <div>
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="dashboard__menu">
            <Menu />
          </div>
        </div>
      </div>

      <div className="dashboard__content">
        <div className="dashboard__profile">
          <div className="dashboard__profile_box">
            <div className="dashboard__profile__image">
              <img src={profileImage} alt="profile" />
            </div>
            <h3>user Name</h3>
          </div>
          <div className="dashboard__profile_icon">
            <img src={profileIcon} alt="profileicon" />
            <img src={logoutIcon} alt="logouticon" />
          </div>
        </div>
        <div className="dashboard__content--main">
          <h1 className="header">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashLayout;
