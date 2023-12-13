import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {

  const isAuthenticated = localStorage.getItem('users') !== null;

  return isAuthenticated ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" replace state={{ from: '/account' }} />
  );
};

export default PrivateRoute;
