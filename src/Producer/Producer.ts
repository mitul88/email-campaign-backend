import amqp from "amqplib";
import { ENV_CONFIG } from "../config/env.config";

export async function sendToQueue(queueName: string, message: any) {
  const connection = await amqp.connect(ENV_CONFIG.RABBIT_MQ.LOCAL_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
}
