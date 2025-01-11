import { Request, Response } from "express-serve-static-core";
import { campaignResponseDto, createCampaignDto } from "../dto/campaign.dto";
import { Campaign } from "../models/campaign.model";
import { CampaignService } from "../service/campaign.service";
import { ICampaign } from "../types/campaign_data_type";

export const createCampaign = async (
  req: Request<{}, {}, createCampaignDto>,
  res: Response<campaignResponseDto>
) => {
  const campaignData: ICampaign = req.body;
  try {
    const campaign = await CampaignService.createCampaign(campaignData);
    res.status(201).send({ message: "campaign initiated" });
    res.end();
    return;
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
    res.end();
    return;
  }
};
