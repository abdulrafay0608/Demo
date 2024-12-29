import express from "express";
import { checkRole, isAuthenticated } from "../middlewares/auth.js";
import {
  addDepartmentController,
  deleteDepartmentController,
  EditDepartmentController,
  getAllDepartmentController,
} from "../controllers/departments_controllers.js";

const router = express.Router();

router.get("/get", getAllDepartmentController);
router.post(
  "/add",
  isAuthenticated,
  checkRole("admin"),
  addDepartmentController
);
router.put(
  "/edit/:id",
  isAuthenticated,
  checkRole("admin"),
  EditDepartmentController
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  checkRole("admin"),
  deleteDepartmentController
);

export default router;
