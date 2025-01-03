import express from "express";

import { checkRole, isAuthenticated } from "../../middlewares/auth.js";
import {
  addTicketPriorityController,
  deleteTicketPriorityController,
  EditTicketPriorityController,
  getAllTicketPriorityController,
} from "../../controllers/tickets_controllers/ticket_priority_controllers.js";

const router = express.Router();

router.get("/get", getAllTicketPriorityController);

router.post(
  "/add",
  isAuthenticated,
  checkRole("admin"),
  addTicketPriorityController
);
router.put(
  "/edit/:id",
  isAuthenticated,
  checkRole("admin"),
  EditTicketPriorityController
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteTicketPriorityController
);

export default router;
