import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
StartCreateAccount;
import Login from '../pages/Login';
import SignUp from '../pages/SignUp.jsx';
import StartCreateAccount from '../pages/StartCreateAccount.jsx';

const AuthNav = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/startCreateAccount" element={<StartCreateAccount />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AuthNav;
