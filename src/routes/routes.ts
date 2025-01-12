import { Express } from "express";
import { router as campaignRouter } from "./campaign.routes";
import { router as notificationRouter } from "./notification.routes";
import { router as authRouter } from "./auth.routes";

export = (app: Express) => {
  app.use("/v1/api/auth", authRouter);
  app.use("/v1/api/campaign", campaignRouter);
  app.use("/v1/api/notifications", notificationRouter);
};
