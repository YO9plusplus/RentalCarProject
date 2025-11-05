import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * This component checks if a user is logged in by looking for a 'token'.
 * If not logged in, it redirects to the /login page.
 * Otherwise, it renders the 'children' components.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // No token found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // Token found, allow access to the protected page
  return children;
};

export default ProtectedRoute;