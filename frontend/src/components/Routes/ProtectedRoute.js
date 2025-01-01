import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If user role is not allowed, redirect to a "Not Authorized" page
  if (!roles.includes(user?.role)) {
    return <Navigate to="/not-authorized" />;
  }

  // If authenticated and role is valid, render the route
  return children;
};

export default ProtectedRoute;
