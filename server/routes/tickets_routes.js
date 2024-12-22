import express from "express";
import { postTicketsController } from "../controllers/tickets_controllers.js";

const router = express.Router();

router.post("/post", postTicketsController);

export default router;
