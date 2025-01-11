import { Document, Types } from "mongoose";

export interface ICampaign extends Document {
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
