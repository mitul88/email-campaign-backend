import { Express } from "express";
import { router as createCampaignRouter } from "./campaign.routes";

export = (app: Express) => {
  app.use("/api", createCampaignRouter);
};
