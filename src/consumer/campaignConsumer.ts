import amqp from "amqplib";
import { ENV_CONFIG } from "../config/env.config";
import { CampaignService } from "../service/campaign.service";
import { sendEmail } from "../helper/email.helper";
import { ICampaign } from "../types/campaign_data_type";

const QUEUE_NAME = ENV_CONFIG.RABBIT_MQ.CAMPAIGN_QUEUE_NAME;

export async function campaignConsumer() {
  try {
    const connection = await amqp.connect(ENV_CONFIG.RABBIT_MQ.LOCAL_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        if (msg) {
          const messageContent = msg.content.toString();

          try {
            const campaign = JSON.parse(messageContent);
            await processCampaign(campaign);
            channel.ack(msg);
          } catch (error) {
            console.error("Error processing message:", error);
            channel.nack(msg, false, false);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Failed to start consumer:", error);
  }
}

async function processCampaign(campaign: ICampaign) {
  if (campaign.type == "email") {
    await sendEmail(campaign);
  }
  await CampaignService.updateCampaignStatus(campaign._id, "sent");
}
