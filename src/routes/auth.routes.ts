import { Router } from "express";
import {
  login,
  refreshTokenHandler,
  register,
} from "../controller/auth.controller";
import { rateLimiterMiddleware } from "../middleware/rateLimiter.middleware";

export const router = Router();

router.route("/login").post([rateLimiterMiddleware], login);
router.route("/refresh-token").get(refreshTokenHandler);
router.route("/register").post(register);
