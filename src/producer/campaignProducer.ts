import amqp from "amqplib";
import { ENV_CONFIG } from "../config/env.config";
import { ICampaign } from "../types/campaign_data_type";

export async function publishCampaign(queueName: string, message: ICampaign) {
  const connection = await amqp.connect(ENV_CONFIG.RABBIT_MQ.LOCAL_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
}
