import express from "express";
import {
  addTicketController,
  deleteTicketController,
  getAllTicketController,
} from "../controllers/tickets_controllers.js";

const router = express.Router();

router.get("/get", getAllTicketController);
router.post("/add", addTicketController);
router.delete("/delete/:id", deleteTicketController);

export default router;
