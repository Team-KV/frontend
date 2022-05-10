import React from 'react';
import { Navigate } from 'react-router-dom';
import MiniDrawer from './MiniDrawer';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  return isLoggedIn ? <MiniDrawer body={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
