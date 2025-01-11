export interface ICampaign {
  name: string;
  message: string;
  recipients: string[];
  type: string;
  status: CampaignStatus;
  scheduleTime: Date;
}

export enum CampaignStatus {
  sent,
  pending,
  failed,
  opened,
}
