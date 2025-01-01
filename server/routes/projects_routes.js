import express from "express";
import {
  addProjectsController,
  getAllProjectsController,
  getSingleProjectController,
  getUserProjectsController,
  UpdateProjectStatusController,
} from "../controllers/projects_controllers/projects_controllers.js";
import { checkRole, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
// checkRole("admin", "user")
router.get("/get", getAllProjectsController);
router.get("/get/:id", getSingleProjectController);
router.get("/get-user-project/:id", getUserProjectsController);
router.post(
  "/add",
  isAuthenticated,
  checkRole("admin", "manager"),
  addProjectsController
);
router.put(
  "/update-project-status/:id",
  isAuthenticated,
  checkRole("admin", "manager"),
  UpdateProjectStatusController
);

export default router;
