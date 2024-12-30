import express from "express";
import {
  getAllUserController,
  LoginCheckController,
  LogOutController,
  SigInController,
  SignUpController,
} from "../controllers/auth_controllers.js";
import { checkRole, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/sign-up", SignUpController);
router.post("/login", SigInController);
router.get("/me", isAuthenticated, LoginCheckController);
router.get("/get", isAuthenticated, checkRole("admin"), getAllUserController);
router.get("/logout", LogOutController);

export default router;
