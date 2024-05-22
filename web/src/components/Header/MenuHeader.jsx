/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import defaultImgIcon from '../../assets/images/defaultImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../store/slices/userSlice';
import { appSelectUsers, getCurrentUser } from '../../store/slices/auth';

const MenuHeader = () => {
  const dispatch = useDispatch();
  const { updateLoad } = useSelector(selectUsers);

  const { currentUser } = useSelector(appSelectUsers);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, updateLoad]);

  const img = currentUser?.imageUrl
    ? `http://localhost:9000/uploads/${currentUser.imageUrl}`
    : defaultImgIcon;
  return (
    <header className="header fs-4 shadow-sm mb-4">
      <div className="header_box">
        <Link to="/">
          <img src={Logo} className="header__logo" />
        </Link>
      </div>
      <div className="header__content">
        <div className="header__right">
          <NavLink to="/profile">
            <img src={img} className="header_profile" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
