import jwt from "jsonwebtoken";
import AuthModel from "../models/authModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in to continue.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthModel.findOne({ email: decoded.email }).select(
      "username email role"
    ); // Fetch only necessary fields
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Session expired. User not found. Please log in again.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication Error:", err.message);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired session. Please log in again.",
    });
  }
};

export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;
      if (!userRole) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized! No role provided.",
        });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).send({
          success: false,
          message: `Access Denied! Role "${userRole}" is not allowed to access this resource.`,
        });
      }

      next(); // Proceed to the controller if role is allowed
    } catch (error) {
      console.error(`Error in Role Authorization: ${error.message}`);
      return res.status(500).send({
        success: false,
        message: "Server Error in Role Authorization",
        error: error.message,
      });
    }
  };
};
