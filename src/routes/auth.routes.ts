import { Router } from "express";
import { login, register } from "../controller/auth.controller";

export const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
