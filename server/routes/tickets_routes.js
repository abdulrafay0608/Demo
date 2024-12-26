import express from "express";
import {
  addTicketController,
  deleteTicketController,
  getAllTicketController,
  EditTicketController,
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
router.put(
  "/edit/:id",
  isAuthenticated,
  checkRole("admin", "user"),
  EditTicketController
);
router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteTicketController
);

export default router;
