import { Router } from "express";
import { createCampaign } from "../controller/campaign.controller";
import { authCheck, checkAdmin } from "../middleware/auth.middleware";

export const router = Router();

router.route("/create").post([authCheck, checkAdmin], createCampaign);
