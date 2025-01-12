import { Types } from "mongoose";
import { Campaign } from "../models/campaign.model";
import { ICampaign } from "../types/campaign_data_type";
import { publishNotification } from "../producer/notificationProducer";

export class CampaignService {
  static async createCampaign(campaignData: ICampaign): Promise<ICampaign> {
    try {
      const campaign = new Campaign(campaignData);
      await campaign.save();
      return campaign;
    } catch (error) {
      console.error("error occured", error);
      throw new Error("campaign creation failed");
    }
  }
  static async getPendingCampaigns(): Promise<ICampaign[]> {
    try {
      const now = new Date();

      const pendingCampaigns = await Campaign.find({
        $or: [
          { status: "pending" },
          {
            status: "scheduled",
            scheduleTime: { $lte: now },
          },
        ],
      });

      return pendingCampaigns;
    } catch (error) {
      console.error("Error fetching pending campaigns:", error);
      throw new Error("Could not retrieve pending campaigns.");
    }
  }

  static async updateCampaignStatus(id: Types.ObjectId, status: string) {
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      throw new Error("Campaign not found");
    }
    campaign.status = status;
    await campaign.save();

    let message: string;
    switch (status) {
      case "sent":
        message = `Campaign "${campaign.name}" has been sent successfully.`;
        break;
      case "failed":
        message = `Campaign "${campaign.name}" failed to send.`;
        break;
      case "opened":
        message = `An email from campaign "${campaign.name}" was opened.`;
        break;
      default:
        message = `Campaign "${campaign.name}" status updated to ${status}.`;
    }

    await publishNotification({
      message,
      type: `campaign_${status.toLowerCase()}`, // e.g., "campaign_sent"
    });
  }
}
