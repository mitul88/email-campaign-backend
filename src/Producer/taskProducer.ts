import amqp from "amqplib";
import { ENV_CONFIG } from "../config/env.config";

class TaskProducer {
  channel!: amqp.Channel;

  async createChannel() {
    const connection = await amqp.connect(ENV_CONFIG.RABBITMQ_LOCAL_URL);
    this.channel = await connection.createChannel();
  }

  async sendToQueue(queueName: string, message: any) {
    if (!this.channel) {
      this.createChannel();
    }

    await this.channel.assertQueue(queueName);
    this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }
}
