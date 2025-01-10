import { Request, Response } from "express-serve-static-core";
import { campaignResponseDto, createCampaignDto } from "../dto/campaign.dto";
import { Campaign } from "../models/campaign.model";

export const createCampaign = async (
  req: Request<{}, {}, createCampaignDto>,
  res: Response<campaignResponseDto>
) => {
  const { name, message, recipients, scheduleTime } = req.body;
  try {
    const campaign = new Campaign({
      name,
      message,
      recipients,
      scheduleTime,
    });
    campaign.save();
    res.status(201).send({ message: "campaign initiated" });
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
    res.end();
    return;
  }
  res.end();
  return;
};
