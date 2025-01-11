import { Application } from "express";
import { router as createCampaignRouter } from "./campaign.routes";
import { router as authRouter } from "./auth.routes";

export = (app: Application) => {
  app.use("v1/api/auth", authRouter);
  app.use("v1/api/campaign", createCampaignRouter);
};
