import { ENV_CONFIG } from "./config/env.config";
import { app } from "./app";
import { dbConnection } from "./db/connection";

const port = ENV_CONFIG.PORT;

app.listen(port, () => {
  dbConnection();
  console.log(`app running on ${port}`);
});
