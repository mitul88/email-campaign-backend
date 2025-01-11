export interface IEnvConfig {
  SERVER: {
    PORT: string;
  };
  RABBIT_MQ: {
    LOCAL_URL: string;
    CAMPAIGN_QUEUE_NAME: string;
    NOTIFICATION_QUEUE_NAME: string;
  };
  MONOGO_DB: {
    LOCAL_URL: string;
    DB_NAME: string;
  };
  JWT: {
    SECRET_KEY: string;
  };
}
