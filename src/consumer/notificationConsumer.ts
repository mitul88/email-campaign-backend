import amqp from "amqplib";
import { ENV_CONFIG } from "../config/env.config";
import { NotificationService } from "../service/notification.service";
import { sendRealTimeNotification } from "../websocket/notificationSocket";

const QUEUE_NAME = ENV_CONFIG.RABBIT_MQ.NOTIFICATION_QUEUE_NAME;

export async function notificationConsumer() {
  try {
    const connection = await amqp.connect(ENV_CONFIG.RABBIT_MQ.LOCAL_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        if (msg) {
          const notification = JSON.parse(msg.content.toString());
          console.log("Received notification:", notification);
          try {
            const savedNotification =
              await NotificationService.createNotification(notification);
            sendRealTimeNotification(savedNotification.userId, notification);
            channel.ack(msg);
          } catch (error) {
            console.error("Error saving notification:", error);
            channel.nack(msg);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error in notification consumer:", error);
  }
}
