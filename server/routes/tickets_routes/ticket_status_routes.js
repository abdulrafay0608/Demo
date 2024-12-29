import express from "express";
import {
  addTicketStatusController,
  deleteTicketStatusController,
  EditTicketStatusController,
  getAllTicketStatusController,
} from "../../controllers/tickets_controllers/ticket_status_controllers.js";
import { checkRole, isAuthenticated } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/get", getAllTicketStatusController);

router.post(
  "/add",
  isAuthenticated,
  checkRole("admin"),
  addTicketStatusController
);
router.put(
  "/edit/:id",
  isAuthenticated,
  checkRole("admin"),
  EditTicketStatusController
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteTicketStatusController
);

export default router;
