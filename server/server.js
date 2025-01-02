import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBConnect from "./utils/dbconnection.js";
import cookieParser from "cookie-parser";
import ticketsRoutes from "./routes/tickets_routes/tickets_routes.js";
import projectsRoutes from "./routes/projects_routes.js";
import customerRoutes from "./routes/customers_routes.js";
import authRoutes from "./routes/auth_routes.js";
import departmentRoutes from "./routes/departments_route.js";
import serviceRoutes from "./routes/services_route.js";
import ticketStatusesRoutes from "./routes/tickets_routes/ticket_status_routes.js";
import ticketPriorityRoutes from "./routes/tickets_routes/ticket_priority_routes.js";
import ticketSeverityRoutes from "./routes/tickets_routes/ticket_severity_routes.js";


dotenv.config();
DBConnect();

const app = express();
// Middlewares
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://abdulrafaytech.vercel.app", // Your deployed frontend
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
app.use("/api/departments", departmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/ticket_statuses", ticketStatusesRoutes);
app.use("/api/ticket_priority", ticketPriorityRoutes);
app.use("/api/ticket_severity", ticketSeverityRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/customers", customerRoutes);

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
