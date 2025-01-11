import { CampaignStatus, ICampaign } from "../types/campaign_data_type";

export interface createCampaignDto {
  name: string;
  message: string;
  recipients: string[];
  type: string;
  status: CampaignStatus;
  scheduleTime: Date;
}

export interface campaignResponseDto {
  message: string;
  data?: ICampaign;
}
