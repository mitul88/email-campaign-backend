import { ENV_CONFIG } from "./config/env.config";
import { app } from "./app";
import { dbConnection } from "./db/connection";
import { SchedulerService } from "./service/scheduler.service";
import { emailConsumer } from "./consumer/consumer";

const port = ENV_CONFIG.SERVER.PORT;

// initialize cron jobs
SchedulerService.initializeScheduler();

// start consuming email task
emailConsumer();

app.listen(port, () => {
  dbConnection();
  console.log(`app running on ${port}`);
});
