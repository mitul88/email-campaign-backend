import express, { Application } from "express";
import routes from "./routes/routes";
import middleware from "./middleware";
import { SchedulerService } from "./service/scheduler.service";
import { emailConsumer } from "./consumer/emailConsumer";
import { notificationConsumer } from "./consumer/notificationConsumer";

export const app: Application = express();

// calling all third party middlewares
middleware(app);

// calling all routes
routes(app);

// initialize cron jobs
SchedulerService.initializeScheduler();

// start consuming email task
emailConsumer();

// start consuming notification tasks
notificationConsumer();
