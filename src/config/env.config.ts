import dotenv from "dotenv";
import { IEnvConfig } from "../types/env_config_type";

dotenv.config();

export const ENV_CONFIG: IEnvConfig = {
  SERVER: {
    PORT: process.env.PORT as string,
  },
  MONOGO_DB: {
    LOCAL_URL: process.env.MONGODB_LOCAL_URL as string,
    DB_NAME: process.env.DB_NAME as string,
  },
  RABBIT_MQ: {
    LOCAL_URL: process.env.RABBITMQ_LOCAL_URL as string,
    QUEUE_NAME: process.env.RABBITMQ_EMAIL_TASK as string,
  },
  JWT: {
    SECRET_KEY: process.env.JWT_SECRET as string,
  },
};
