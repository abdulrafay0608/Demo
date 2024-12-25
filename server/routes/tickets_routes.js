import express from "express";
import {
  addTicketController,
  getAllTicketController,
} from "../controllers/tickets_controllers.js";

const router = express.Router();

router.get("/get", getAllTicketController);
router.post("/add", addTicketController);

export default router;
