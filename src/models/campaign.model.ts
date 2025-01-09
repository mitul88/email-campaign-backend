import { Schema, model, Types } from "mongoose";

interface ICampaign {
  name: string;
  message: string;
  recipients: string[];
  scheduleTime: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    recipients: { type: [String], required: true },
    scheduleTime: Date,
  },
  { timestamps: true }
);

export const Campaign = model<ICampaign>("Campaign", campaignSchema);
