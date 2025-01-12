import mongoose, { Schema } from "mongoose";
import { INotification } from "../types/notification_data_type";

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "campaign_pending",
        "campaign_scheduled",
        "campaign_sent",
        "campaign_opened",
        "campaign_failed",
      ],
      default: "campaign_scheduled",
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "opened", "failed", "sent"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);

export default Notification;
