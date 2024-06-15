// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import { Home } from '../pages/tenant/Home';
import Footer from '../components/Footer/Footer';
import PropertyList from '../components/Property/PropertyList';
import PropertyDetails from '../components/Property/PropertyDetails';
import Profile from '../pages/tenant/Profile';
import YourHome from '../pages/tenant/YourHome';
import YourInbox from '../pages/tenant/YourInbox';

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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default TenantNav;
