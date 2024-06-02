// eslint-disable-next-line no-unused-vars
import React, { useDebugValue, useEffect } from 'react';
import AuthNav from './AuthNav';
import LandLordNav from './LandLordNav';
import TenantNav from './TenantNav';
import { appSelectUsers, checkAuth } from '../store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Custom/Loading';
import AdminNav from './AdminNav';

const MainNav = () => {
  const dispatch = useDispatch();
  const { token, userType, error, isLoading, isLogin } =
    useSelector(appSelectUsers);

  useEffect(() => {
    dispatch(checkAuth());
  }, [token, error, dispatch]);

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex-1 bg-blue-100">
        <div
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            display: 'flex',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 40,
              borderRadius: 10,
            }}
          >
            <Loading />
          </div>
        </div>
      </div>
    );
  }
  console.log('usertype', userType);
  return (
    <div>
      {isLogin ? (
        <>
          {userType === 'landlord' && <LandLordNav />}
          {userType === 'admin' && <AdminNav />}
          {userType === 'tenants' && <TenantNav />}
        </>
      ) : (
        <AuthNav />
      )}
    </div>
  );
};
export default MainNav;
