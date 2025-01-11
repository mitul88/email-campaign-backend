import { Document } from "mongoose";

export interface INotification extends Document {
  userId: string;
  message: string;
  type: string;
  status: string;
  createdAt: Date;
}
