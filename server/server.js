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
const corsOptions = {
  origin: "https://abdulrafaytech.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Date",
    "X-Api-Version",
  ],
  exposedHeaders: ["set-cookie"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Add preflight handling
app.options("*", cors(corsOptions));

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
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.setTimeout(50000); // Set timeout to 50 seconds
