import { Router } from "express";
import { createCampaign } from "../controller/campaign.controller";

export const router = Router();

router.route("/create-campaign").post(createCampaign);
