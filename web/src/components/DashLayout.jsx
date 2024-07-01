// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Logo from '../assets/images/logo.png';

// menu
import Menu from './Menu';

// icons
import logoutIcon from '../assets/icons/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  appSelectUsers,
  getCurrentUser,
  userLogout,
} from '../store/slices/auth';
import { Link, useNavigate } from 'react-router-dom';
import { selectUsers } from '../store/slices/userSlice';
import defaultImgIcon from '../assets/images/defaultImg.png';
import { capitalize } from '@mui/material';

// eslint-disable-next-line react/prop-types
const DashLayout = ({ children, title, menuType }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    navigateTo('/');
  };

  const { currentUser } = useSelector(appSelectUsers);
  const { updateLoad } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, updateLoad]);

  const img = currentUser?.imageUrl
    ? `http://localhost:9000/uploads/${currentUser.imageUrl}`
    : defaultImgIcon;

  'meee', currentUser;

  return (
    <section className="dashboard">
      <div className="dashboard__sidebar">
        <div>
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="dashboard__menu">
            <Menu menuType={menuType} />
          </div>
        </div>
      </div>

      <div className="dashboard__content">
        <div className="dashboard__profile">
          <div className="dashboard__profile_box">
            <div className="dashboard__profile__image">
              <Link to={'/profile'}>
                <img src={img} alt="profile" />
              </Link>
            </div>
            <h3>
              {currentUser.firstname && capitalize(currentUser?.firstname)}{' '}
              {currentUser.lastname && capitalize(currentUser?.lastname)}
            </h3>
          </div>
          <div className="dashboard__profile_icon">
            <img
              src={logoutIcon}
              alt="logouticon"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
        <div className="dashboard__content--main">
          <h1 className="dashboard__content__header">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashLayout;
