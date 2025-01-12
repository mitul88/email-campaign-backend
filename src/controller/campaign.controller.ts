import { Request, Response } from "express";
import { campaignResponseDto, createCampaignDto } from "../dto/campaign.dto";
import { CampaignService } from "../service/campaign.service";
import { ICampaign } from "../types/campaign_data_type";
import _ from "lodash";
import { validateCampaignDataInput } from "../helper/validateInput.helper";

export const createCampaign = async (
  req: Request<{}, {}, createCampaignDto>,
  res: Response<campaignResponseDto>
) => {
  const userId: string = req.user!._id;
  const campaignData = req.body;
  const { error } = validateCampaignDataInput(
    _.pick(campaignData, [
      "name",
      "subject",
      "recipients",
      "message",
      "type",
      "scheduleTime",
    ])
  );
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    res.end();
    return;
  }

  try {
    const campaign = await CampaignService.createCampaign(
      campaignData as ICampaign,
      userId as string
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
