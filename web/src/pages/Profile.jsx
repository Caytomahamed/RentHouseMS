/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// import ProfileHeader from './ProfileHeader';
// import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import MenuHeader from '../components/Header/MenuHeader';
import CustomButton from '../components/Custom/CustomButton';
import {
  appSelectUsers,
  changePassword,
  getCurrentUser,
  userLogout,
} from '../store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import defaultImgIcon from '../assets/images/defaultImg.png';
import { toast } from 'react-toastify';

import { deleteUser, selectUsers, updateUser } from '../store/slices/userSlice';
import { getUnReadInbox, selectInboxes } from '../store/slices/inboxSlice';
import { uploadFolder } from '../../config/config';

const Profile = (props) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [key, setKey] = useState(0);

  const { updateLoad } = useSelector(selectUsers);
  const { currentUser } = useSelector(appSelectUsers);

  const [isEdit, setIsEdit] = useState(false);
  const [updateImg, setUpdateImg] = useState(null);

  const [user, setUser] = useState({
    id: currentUser?.id,
    firstname: currentUser?.firstname,
    lastname: currentUser?.lastname,
    email: currentUser?.email,
    imageUrl: currentUser?.imageUrl,
  });

  const [passwordChange, setPasswordChange] = useState({
    currentpassword: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, updateLoad]);

  const handleLogout = () => {
    dispatch(userLogout());
    setKey((prevKey) => prevKey + 1);
    navigateTo('/');
  };

  const img = currentUser?.imageUrl
    ? `${uploadFolder}/${currentUser.imageUrl}`
    : defaultImgIcon;

  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setPasswordChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setUser({
      id: currentUser?.id,
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      email: currentUser?.email,
      imageUrl: currentUser?.imageUrl,
    });
  }, [dispatch, currentUser]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdate = () => {
    let file;

    if (updateImg && updateImg.size !== 0) {
      file = updateImg;
    } else {
      file = null;
    }

    delete user.imageUrl;

    const changes = { ...user };

    dispatch(updateUser({ ...changes }, file));
    setUser({});
    setIsEdit(false);
    setUpdateImg('');

    toast.success('User updated successfully');
  };

  const handleChagePass = () => {
    // change password logic
    if (passwordChange.password !== passwordChange.passwordConfirm) {
      toast.error('Password does not match');

      setPasswordChange({
        currentpassword: '',
        password: '',
        passwordConfirm: '',
      });
      return;
    }

    dispatch(changePassword(passwordChange));
    setPasswordChange({
      currentpassword: '',
      password: '',
      passwordConfirm: '',
    });

    toast.success('Password changed successfully');
  };

  const hanldeDelete = () => {
    handleLogout();
    deleteUser(currentUser?.id);
    toast.success('User deleted successfully');
  };

  // unRead inbox
  const { myInboxLoading } = useSelector(selectInboxes);
  'myInboxLoading', myInboxLoading;

  useEffect(() => {
    dispatch(getUnReadInbox(currentUser?.id));
  }, [dispatch, currentUser, myInboxLoading]);

  const { unRead } = useSelector(selectInboxes);

  console.log('UREAD', unRead);

  return (
    <>
      <MenuHeader />

      <div className="">
        {/* <ProfileHeader /> */}
        <div className="profile">
          <div className="profile_img_upload">
            <Avatar
              // src={img ? img : ''}
              src={img}
              alt="t"
              style={{
                height: 10 + 'rem',
                width: 10 + 'rem',
                marginTop: '3rem',
              }}
            />
            {/* {currentUser?.userType !== 'tenant' && ( */}
            <div style={{ height: '5rem' }}></div>
            {/* // )} */}
            {currentUser?.userType === 'tenants' && (
              <Link to="/yourHome">
                <CustomButton
                  label="YourHome"
                  color={'#E47675'}
                  style={{
                    padding: '1.5rem 2rem',
                    marginTop: '3rem',
                    width: '24rem',
                  }}
                />
              </Link>
            )}

            <Link to="/yourInbox" className="link">
              <div className="inbox-container ">
                <button className="inbox-button ">
                  Inbox
                  <span className="badge" id="unreadCount">
                    {unRead}
                  </span>
                </button>
              </div>
            </Link>

            <button
              style={{
                fontWeight: 'bold',
                color: 'black',
                textDecoration: 'underline',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
              }}
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          </div>

          <div className="profile__detial">
            <h1>Hi, I’m {currentUser?.firstname}</h1>
            <p className="profile__detial-join">Joined in 2022</p>

            <div className="profile__detial__forms profile__detial__forms--1">
              <div>
                <h2>your Profile</h2>
                <input
                  type="text"
                  value={user?.firstname}
                  readOnly={!isEdit}
                  onChange={(value) =>
                    setUser({ ...user, firstname: value.target.value })
                  }
                />
                <input
                  type="text"
                  value={user?.lastname}
                  readOnly={!isEdit}
                  onChange={(value) =>
                    setUser({ ...user, lastname: value.target.value })
                  }
                />
                <input
                  type="email"
                  value={user?.email}
                  readOnly={!isEdit}
                  onChange={(value) =>
                    setUser({ ...user, email: value.target.value })
                  }
                />
                <input
                  type="file"
                  disabled={!isEdit}
                  // value={updateImg}
                  onChange={(value) => {
                    setUpdateImg(value.target.files[0]);

                    setTimeout(() => (value.target.value = ''), 2000);
                  }}
                />

                {isEdit && (
                  <CustomButton
                    label="Edit profile"
                    color={'#E47675'}
                    style={{
                      padding: '1.5rem 2rem',
                      marginTop: '3rem',
                      width: '80%',
                    }}
                    onClick={handleUpdate}
                  />
                )}
              </div>
              <div className="profile__detial__forms">
                <h2>Change Your passowrd</h2>
                <input
                  type="password"
                  name="currentpassword"
                  placeholder="Current password"
                  value={passwordChange.currentpassword}
                  onChange={handleChangePassword}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New passowrd"
                  value={passwordChange.password}
                  onChange={handleChangePassword}
                />
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm passowrd"
                  value={passwordChange.passwordConfirm}
                  onChange={handleChangePassword}
                />
                <CustomButton
                  label="Change password"
                  color={'#E47675'}
                  style={{
                    padding: '1.5rem 2rem',
                    marginTop: '3rem',
                    width: '80%',
                  }}
                  onClick={handleChagePass}
                  disabled={
                    !passwordChange.currentpassword ||
                    !passwordChange.password ||
                    !passwordChange.passwordConfirm
                  }
                />
              </div>
            </div>

            <div className="border-bottom border-top py-4  px-4 mt-5 profile_detial_login">
              <CustomButton
                label="Logout"
                color={'#E47675'}
                style={{
                  padding: '1.5rem 2rem ',
                  marginTop: '3rem',
                  transform: 'translatey(-20%)',
                }}
                onClick={handleLogout}
              />
              <h4 className="Danger" onClick={hanldeDelete}>
                Delete account
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
