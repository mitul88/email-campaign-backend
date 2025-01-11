import dotenv from "dotenv";
import { IEnvConfig } from "../types/env_config_type";

dotenv.config();

export const ENV_CONFIG: IEnvConfig = {
  PORT: process.env.PORT as string,
  MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL as string,
  RABBITMQ_LOCAL_URL: process.env.RABBITMQ_LOCAL_URL as string,
  RABBITMQ_EMAIL_TASK: process.env.RABBITMQ_EMAIL_TASK as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
