import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard.jsx';
import ErrorPage from '../pages/ErrorPage';

import LandLords from '../pages/Admin/LandLords.jsx';
import Bookings from '../pages/Admin/Bookings';
import Properties from '../pages/Admin/Properties.jsx';
import Tenants from '../pages/Admin/Tenants.jsx';

const AdminNav = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/drivers" element={<LandLords />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/bookings" element={<Bookings />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AdminNav;
