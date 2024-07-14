import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../Pages/HomePage/Home';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Calculator from './Calculator/Calculator';
import DiaryPage from '../Pages/DiaryPage/DiaryPage';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/calc" element={<PrivateRoute component={Calculator} />} />
                <Route path="/diary" element={<PrivateRoute component={DiaryPage} />} />
                <Route path="/" element={<Home />} />
                <Route path="/SlimMom" element={<Home />} />
                <Route path="/SlimMom/*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
};

export default App;