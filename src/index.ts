import { ENV_CONFIG } from "./config/env.config";
import { app } from "./app";
import { dbConnection } from "./db/connection";
import { SchedulerService } from "./service/scheduler.service";

const port = ENV_CONFIG.PORT;

// initialize cron jobs
SchedulerService.initializeScheduler();

app.listen(port, () => {
  dbConnection();
  console.log(`app running on ${port}`);
});
