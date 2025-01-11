export interface ICampaign {
  name: string;
  message: string;
  recipients: string[];
  type: string;
  status: string;
  scheduleTime: Date;
}

export enum CampaignStatus {
  PENDING,
  SCHEDULED,
  SENT,
  FAILED,
}
