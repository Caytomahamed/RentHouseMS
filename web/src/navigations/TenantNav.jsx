// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import { Home } from '../pages/NoLogin/Home';
import Footer from '../components/Footer/Footer';
import PropertyList from '../components/Property/PropertyList';
import PropertyDetails from '../components/Property/PropertyDetails';
import YourHome from '../pages/tenant/YourHome';
import Profile from '../pages/Profile';
import YourInbox from '../pages/YourInbox';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp.jsx';
import StartCreateAccount from '../pages/StartCreateAccount.jsx';
import LikesList from '../components/Property/LikesList.jsx';

const TenantNav = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propertyList" element={<PropertyList />} />
          <Route path="/propertyDetails/:id" element={<PropertyDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/yourInbox" element={<YourInbox />} />
          <Route path="/yourHome" element={<YourHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/likes" element={<LikesList />} />
          <Route path="/startCreateAccount" element={<StartCreateAccount />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default TenantNav;
