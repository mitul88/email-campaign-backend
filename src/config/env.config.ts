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
    CAMPAIGN_QUEUE_NAME: process.env.RABBITMQ_CAMPAIGN_QUEUE_NAME as string,
    NOTIFICATION_QUEUE_NAME: process.env
      .RABBITMQ_NOTIFICATION_QUEUE_NAME as string,
  },
  JWT: {
    SECRET_KEY: process.env.JWT_SECRET as string,
    EXPIRATION: process.env.JWT_EXPIRATION as string,
    REFRESH_TOKEN_EXPIRATION: process.env
      .JWT_REFRESH_TOKEN_EXPIRATION as string,
  },
  MAILERSEND: {
    API_KEY: process.env.MAILERSEND_API_KEY as string,
  },
};
