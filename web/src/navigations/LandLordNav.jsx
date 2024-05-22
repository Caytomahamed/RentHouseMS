// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandLordDash from '../pages/landLord/LandLordDash';
import ErrorPage from '../pages/ErrorPage';
import LandLordBook from '../pages/landLord/LandLordBook';
import LandLordProperties from '../pages/landLord/LandLordProperties';

const LandLordNav = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandLordDash />} />
        <Route path="/landLordBook" element={<LandLordBook />} />
        <Route path="/landLordProperties" element={<LandLordProperties />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default LandLordNav;
