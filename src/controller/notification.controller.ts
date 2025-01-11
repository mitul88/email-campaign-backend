import { Request, Response } from "express";
import { NotificationService } from "../service/notification.service";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await NotificationService.getNotifications();
    res
      .status(200)
      .send({ message: "notifications fetched", data: notifications });
    res.end();
    return;
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
    res.end();
    return;
  }
};
