import express from "express";
import {
  addTicketController,
  deleteTicketController,
  getAllTicketController,
  EditTicketController,
  getSingleTicketController,
  UpdateStatusController,
} from "../controllers/tickets_controllers.js";
import { checkRole, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
// checkRole("admin", "user")
router.get("/get", getAllTicketController);
router.get("/get/:id", getSingleTicketController);
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
router.put(
  "/update-status/:id",
  isAuthenticated,
  checkRole("admin", "user"),
  UpdateStatusController
);
router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteTicketController
);

export default router;
