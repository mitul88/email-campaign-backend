import express, { Application } from "express";
import routes from "./routes/routes";
import middleware from "./middleware";
import { SchedulerService } from "./service/scheduler.service";
import { campaignConsumer } from "./consumer/campaignConsumer";
import { notificationConsumer } from "./consumer/notificationConsumer";

export const app: Application = express();

// calling all third party middlewares
middleware(app);

// calling all routes
routes(app);

// initialize cron jobs
SchedulerService.initializeScheduler();

// start consuming email task
campaignConsumer();

// start consuming notification tasks
notificationConsumer();
