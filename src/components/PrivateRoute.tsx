import React from 'react';
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({ children } : any) => {
  const token = true;

  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;