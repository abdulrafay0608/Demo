import express from "express";
import {
  LoginCheckController,
  LogOutController,
  SigInController,
  SignUpController,
} from "../controllers/auth_controllers.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.post("/sign-up", SignUpController);
router.post("/login", SigInController);
router.get("/me", isAuthenticated, LoginCheckController);
router.get("/logout", LogOutController);

export default router;
