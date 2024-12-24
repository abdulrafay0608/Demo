import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBConnect from "./utils/dbconnection.js";
import ticketsRoutes from "./routes/tickets_routes.js";
import authRoutes from "./routes/auth_routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
DBConnect();

const app = express();
// Middlewares
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://abdulrafaytect.vercel.app", // Your deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request from the allowed origins
      } else {
        callback(new Error("Not allowed by CORS")); // Reject requests from non-allowed origins
      }
    },
    credentials: true, // Allow cookies and other credentials to be included in the request
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// App Routes
app.use("/api/tickets", ticketsRoutes);
app.use("/api/auth", authRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the CRM Application Backend!");
});
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working!" });
});
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
