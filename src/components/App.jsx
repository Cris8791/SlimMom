import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../Pages/HomePage/Home';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Calculator from './Calculator/Calculator';
import DiaryPage from '../Pages/DiaryPage/DiaryPage';
import NavBar from './NavBar/NavBar';

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/calculator" element={<PrivateRoute component={Calculator} />} />
                <Route path="/diary" element={<PrivateRoute component={DiaryPage} />} />
                <Route path="/" element={<Home />} />
                <Route path="/SlimMom" element={<Home />} />
                <Route path="/SlimMom/*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
};

export default App;
