import jwt from "jsonwebtoken";
import AuthModel from "../models/authModel.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log("token", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please log in to continue",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Session expired. Please log in again",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Your session has expired. Please log in again",
    });
  }
};

export default isAuthenticated;
