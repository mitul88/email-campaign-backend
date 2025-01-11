export interface IEnvConfig {
  PORT: string;
  MONGODB_LOCAL_URL: string;
  RABBITMQ_LOCAL_URL: string;
  RABBITMQ_EMAIL_TASK: string;
  JWT_SECRET: string;
}
