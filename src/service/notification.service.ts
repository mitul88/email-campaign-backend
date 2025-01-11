import Notification from "../models/notification.model";
import { INotification } from "../types/notification_data_type";

export class NotificationService {
  static async createNotification(
    notificationData: INotification
  ): Promise<INotification> {
    try {
      const notification = new Notification(notificationData);
      await notification.save();
      return notification;
    } catch (error) {
      console.error("error occured", error);
      throw new Error("notification creation failed");
    }
  }

  static async getNotifications(): Promise<INotification[]> {
    const notifications = await Notification.find();
    return notifications;
  }
}
