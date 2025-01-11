import { Schema, model } from "mongoose";
import { ICampaign } from "../types/campaign_data_type";

const campaignSchema = new Schema<ICampaign>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    recipients: { type: [String], required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "scheduled", "sent", "open", "failed"],
      default: "pending",
    },
    scheduleTime: Date,
  },
  { timestamps: true }
);

export const Campaign = model<ICampaign>("Campaign", campaignSchema);
