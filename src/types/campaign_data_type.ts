import { Types } from "mongoose";

export interface ICampaign {
  _id: Types.ObjectId;
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
