import { Document, Types } from "mongoose";

export interface ICampaign extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  message: string;
  recipients: string[];
  type: string;
  status: string;
  scheduleTime: Date;
  userId: Schema.Types.ObjectId;
}

export enum CampaignStatus {
  PENDING,
  SCHEDULED,
  SENT,
  FAILED,
}
