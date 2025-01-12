import { Request, Response } from "express";
import { campaignResponseDto, createCampaignDto } from "../dto/campaign.dto";
import { CampaignService } from "../service/campaign.service";
import { ICampaign } from "../types/campaign_data_type";

export const createCampaign = async (
  req: Request<{}, {}, createCampaignDto>,
  res: Response<campaignResponseDto>
) => {
  const campaignData = req.body;
  try {
    const campaign = await CampaignService.createCampaign(
      campaignData as ICampaign
    );
    res.status(201).send({ message: "campaign initiated" });
    res.end();
    return;
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
    res.end();
    return;
  }
};
