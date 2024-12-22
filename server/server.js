import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBConnect from "./utils/dbconnection.js";
import ticketsRoutes from "./routes/tickets_routes.js";
import authRoutes from "./routes/auth_routes.js";

dotenv.config();
DBConnect();
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));

// app routes
// app.use("/api/auth", authRoute);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/auth", authRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("Welcome to CRM Application!");
});

// PORT
app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening on port http://localhost:${process.env.PORT}/`
  );
});
