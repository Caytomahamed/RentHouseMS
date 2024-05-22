import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ErrorPage from '../pages/ErrorPage';
import Students from '../pages/Students.jsx';
import LandLords from '../pages/LandLords.jsx';
import Schedules from '../pages/Schedules';
import Bookings from '../pages/Bookings';
import Cars from '../pages/Cars';
import OurRoutes from '../pages/OurRoutes';

const AppNav = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/drivers" element={<LandLords />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/routes" element={<OurRoutes />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppNav;
