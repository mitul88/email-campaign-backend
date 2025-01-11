import schedule from "node-schedule";
import { CampaignService } from "./campaign.service";
import { ENV_CONFIG } from "../config/env.config";
import { sendToQueue } from "../producer/Producer";

export class SchedulerService {
  static async schedulePendingCampaign() {
    const pendingCampaigns = await CampaignService.getPendingCampaigns();
    for (const campaign of pendingCampaigns) {
      await sendToQueue(
        ENV_CONFIG.RABBIT_MQ.QUEUE_NAME || "campaignQueue",
        campaign
      );
      await CampaignService.changeCampaignStatus(campaign._id, "scheduled");
    }
  }

  //   schedule queuing task for every minute
  static initializeScheduler() {
    console.log("scheduler intiated");
    schedule.scheduleJob("* * * * *", this.schedulePendingCampaign);
  }
}
