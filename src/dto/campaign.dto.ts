export interface createCampaignDto {
  name: string;
  message: string;
  recipients: string[];
  scheduleTime: Date;
}

export interface campaignResponseDto {
  message: string;
  token?: string;
}
