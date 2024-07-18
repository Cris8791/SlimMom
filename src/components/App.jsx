// src/components/App.jsx
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../Pages/HomePage/Home';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Calculator from './Calculator/Calculator';
import DiaryPage from '../Pages/DiaryPage/DiaryPage';
import NavBar from './NavBar/NavBar';
import PrivateRoute from './PrivateRoute';
import { logoutUser } from './Redux/authSlice/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const hasCompleteUserData = user && user.height && user.currentWeight && user.desiredWeight && user.bloodType;

  return (
    <div>
      <NavBar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SlimMom" element={<Home />} />
        <Route
          path="/login"
          element={
            isLoggedIn
              ? (hasCompleteUserData ? <Navigate to="/diary" /> : <Navigate to="/calculator" />)
              : <Login />
          }
        />
        <Route
          path="/registration"
          element={isLoggedIn ? <Navigate to="/calculator" /> : <Registration />}
        />
        <Route
          path="/calculator"
          element={
            <PrivateRoute>
              <Calculator />
            </PrivateRoute>
          }
        />
        <Route
          path="/diary"
          element={
            <PrivateRoute>
              {hasCompleteUserData ? <DiaryPage /> : <Navigate to="/calculator" />}
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
