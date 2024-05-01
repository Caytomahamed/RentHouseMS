// eslint-disable-next-line no-unused-vars
import React from 'react';

//icons
import dashIcon from '../assets/icons/dashboard.svg';
import bookingIcon from '../assets/icons/booking.svg';
import scheduleIcon from '../assets/icons/schedule.svg';
import userIcon from '../assets/icons/users.svg';
import carIcon from '../assets/icons/drivers.svg';
import routeIcon from '../assets/icons/dash-routes.svg';
import driverIcon from '../assets/icons/dash-drivers.svg';

/// Links
import { Link } from 'react-router-dom';

const getRandomColor = () => {
  var letters = [
    'linear-gradient( to right bottom,  rgba(255, 185, 0, 0.85),  rgba(255, 119, 48, 0.85))',
    'linear-gradient(to right bottom,rgba(126, 213, 111, 0.85), rgba(40, 180, 133, 0.85))',
    'linear-gradient(to right bottom,rgba(41, 152, 255, 0.85),rgba(86, 67, 250, 0.85))',
    'linear-gradient(to right bottom,#c084fc,#581c87)',
    'linear-gradient(to right bottom,#f472b6,#701a75)',
    'linear-gradient(to right bottom, #fdba74,#c2410c)',
    'linear-gradient(to right bottom, #74ebd5,#acb6e5 )',
    'linear-gradient(to right bottom, #1cb5e0,#000046)',
    'linear-gradient(to right bottom, #cbb4d4,#20002c)',
  ];

  return letters[Math.floor(Math.random() * letters.length)];
};

function Menu() {
  const menus = [
    {
      name: 'dashboard',
      path: '/',
      icon: dashIcon,
    },
    {
      name: 'Properties',
      path: '/schedules',
      icon: scheduleIcon,
    },

    {
      name: 'Tenants',
      path: '/students',
      icon: userIcon,
    },
    {
      name: 'landlords',
      path: '/drivers',
      icon: driverIcon,
    },
    {
      name: 'cars',
      path: '/cars',
      icon: carIcon,
    },
    {
      name: 'bookings',
      path: '/bookings',
      icon: bookingIcon,
    },
    {
      name: 'routes',
      path: '/routes',
      icon: routeIcon,
    },
  ];
  return (
    <ul style={{ display: 'flex', flexDirection: 'column' }}>
      {menus.map((menu) => {
        return (
          <li
            key={menu.path}
            style={{
              backgroundImage: getRandomColor(),
              backgroundColor: getRandomColor(),
              width: '100%',
              padding: '1.2rem',
              paddingLeft: '2.3rem',
              paddingRight: '2.3rem',
            }}
          >
            <Link to={menu.path}>
              <img src={menu.icon} alt="menu" />
              {menu.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Menu;
