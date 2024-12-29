import express from "express";
import { checkRole, isAuthenticated } from "../middlewares/auth.js";
import {
  addStatusController,
  deleteStatusController,
  EditStatusController,
  getAllStatusController,
} from "../controllers/status_controllers.js";

const router = express.Router();

router.get("/get", getAllStatusController);

router.post("/add", isAuthenticated, checkRole("admin"), addStatusController);
router.put(
  "/edit/:id",
  isAuthenticated,
  checkRole("admin"),
  EditStatusController
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteStatusController
);

export default router;
