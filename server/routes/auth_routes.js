import express from "express";
import {
  LoginCheckController,
  LogOutController,
  SigInController,
  SignUpController,
} from "../controllers/auth_controllers.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.post("/sign_up", SignUpController);
router.get("/me", isAuthenticated, LoginCheckController);
router.post("/sign_in", SigInController);
router.get("/logout", LogOutController);

export default router;
