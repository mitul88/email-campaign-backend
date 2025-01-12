import amqp from "amqplib";
import { ENV_CONFIG } from "../config/env.config";

const QUEUE_NAME = ENV_CONFIG.RABBIT_MQ.NOTIFICATION_QUEUE_NAME;

export async function publishNotification(notification: any) {
  const connection = await amqp.connect(ENV_CONFIG.RABBIT_MQ.LOCAL_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(notification)), {
    persistent: true,
  });

  setTimeout(() => connection.close(), 500);
}
