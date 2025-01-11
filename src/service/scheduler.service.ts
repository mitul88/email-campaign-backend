import schedule from "node-schedule";
import { CampaignService } from "./campaign.service";
import { TaskProducer } from "../Producer/Producer";
import { ENV_CONFIG } from "../config/env.config";

export class SchedulerService {
  static async schedulePendingCampaign() {
    const pendingCampaigns = await CampaignService.getPendingCampaigns();
    for (const campaign of pendingCampaigns) {
      await TaskProducer.sendToQueue(ENV_CONFIG.RABBITMQ_EMAIL_TASK, campaign);
      console.log(`Campaign queued`);
    }
  }

  //   schedule queuing task for every minute
  static initializeScheduler() {
    schedule.scheduleJob("* * * * *", this.schedulePendingCampaign);
  }
}
