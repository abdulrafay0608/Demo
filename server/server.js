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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Enable cookies
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
  res.send("Welcome to CRM Application!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
