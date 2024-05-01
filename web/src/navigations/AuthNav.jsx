import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

import Login from '../pages/Login';

const AuthNav = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AuthNav;
