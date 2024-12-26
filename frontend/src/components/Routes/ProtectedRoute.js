import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const userRole = user?.role; // Get user role (from context or state)
  
  // If the user doesn't have permission, redirect them
  if (!allowedRoles.includes(userRole)) {
    return <Redirect to="/unauthorized" />;
  }

  return children;
};
