import { Document, Schema } from "mongoose";

export interface ICampaign extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  subject: string;
  message: string;
  recipients: string[];
  type: string;
  status: string;
  scheduleTime: Date;
  userId: String;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum CampaignStatus {
  PENDING,
  SCHEDULED,
  SENT,
  FAILED,
}
