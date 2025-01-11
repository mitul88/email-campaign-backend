import { Router } from "express";
import { getNotifications } from "../controller/notification.controller";

export const router = Router();

router.route("/").get(getNotifications);
