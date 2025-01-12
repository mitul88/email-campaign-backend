import { CampaignStatus, ICampaign } from "../types/campaign_data_type";

export interface createCampaignDto {
  name: string;
  message: string;
  subject: string;
  recipients: string[];
  type: string;
  status: string;
  scheduleTime: Date;
}

export interface campaignResponseDto {
  message: string;
  data?: ICampaign;
}
