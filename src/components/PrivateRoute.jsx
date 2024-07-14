// Src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
    const { user } = useSelector((state) => state.auth);

    return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
