import { Campaign } from "../models/campaign.model";
import { CampaignStatus, ICampaign } from "../types/campaign_data_type";

export class CampaignService {
  static async createCampaign(campaignData: ICampaign): Promise<ICampaign> {
    try {
      const campaign = await Campaign.create(campaignData);
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
          { status: CampaignStatus.PENDING },
          {
            status: CampaignStatus.SCHEDULED,
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
}
