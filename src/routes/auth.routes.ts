import { Router } from "express";
import { login } from "../controller/auth.controller";

export const router = Router();

router.route("/login").post(login);
