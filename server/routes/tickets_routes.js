import express from "express";
import {
  addTicketController,
  deleteTicketController,
  getAllTicketController,
} from "../controllers/tickets_controllers.js";
import { checkRole, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
// checkRole("admin", "user")
router.get("/get", getAllTicketController);
router.post(
  "/add",
  isAuthenticated,
  checkRole("admin", "user"),
  addTicketController
);
router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteTicketController
);

export default router;
