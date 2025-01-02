import express from "express";

import { checkRole, isAuthenticated } from "../middlewares/auth.js";
import {
    addCustomerController,
  getAllCustomersController,
  getSingleCustomerController,
  UpdateCustomerStatusController,
} from "../controllers/customers_controllers/customers_controllers.js";

const router = express.Router();
// checkRole("admin", "user")
router.get("/get", getAllCustomersController);
router.get("/get/:id", getSingleCustomerController);
// router.get("/get-user-project/:id", getUserProjectsController);
router.post(
  "/add",
  isAuthenticated,
  checkRole("admin", "manager"),
  addCustomerController
);
router.put(
  "/update-customer-status/:id",
  isAuthenticated,
  checkRole("admin", "manager"),
  UpdateCustomerStatusController
);

export default router;
