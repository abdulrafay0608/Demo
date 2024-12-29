import express from "express";
import { checkRole, isAuthenticated } from "../middlewares/auth.js";
import {
  addServiceController,
  deleteServiceController,
  EditServicesController,
  getAllServiceController,
} from "../controllers/services_controllers.js";

const router = express.Router();

router.get("/get", getAllServiceController);
router.post("/add", isAuthenticated, checkRole("admin"), addServiceController);
router.put(
  "/edit/:id",
  isAuthenticated,
  checkRole("admin"),
  EditServicesController
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteServiceController
);

export default router;
