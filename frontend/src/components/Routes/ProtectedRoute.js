import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const userRole = user?.role;
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  // If the user doesn't have permission, redirect them
  if (!allowedRoles.includes(userRole)) {
    return <Redirect to="/unauthorized" />;
  }

  return children;
};
