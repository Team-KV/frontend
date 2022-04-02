import React from 'react';
import { render } from 'react-dom';
import { Navigate, Route, Routes } from 'react-router-dom';
import MiniDrawer from './MiniDrawer';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  return isLoggedIn ? <MiniDrawer body={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
