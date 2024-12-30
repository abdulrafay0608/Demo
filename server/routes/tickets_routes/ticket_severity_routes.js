import express from "express";

import { checkRole, isAuthenticated } from "../../middlewares/auth.js";
import {
  addTicketSeverityController,
  deleteTicketSeverityController,
  EditTicketSeverityController,
  getAllTicketSeverityController,
} from "../../controllers/tickets_controllers/ticket_severity_controllers.js";

const router = express.Router();

router.get("/get", getAllTicketSeverityController);

router.post(
  "/add",
  isAuthenticated,
  checkRole("admin"),
  addTicketSeverityController
);
router.put(
  "/edit/:id",
  isAuthenticated,
  checkRole("admin"),
  EditTicketSeverityController
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteTicketSeverityController
);

export default router;
