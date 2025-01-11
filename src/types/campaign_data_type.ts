export interface ICampaign {
  name: string;
  message: string;
  recipients: string[];
  type: string;
  status: CampaignStatus;
  scheduleTime: Date;
}

export enum CampaignStatus {
  PENDING = "pending",
  SCHEDULED = "scheduled",
  SENT = "sent",
  FAILED = "failed",
}
