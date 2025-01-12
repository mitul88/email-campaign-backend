import Joi from "joi";
interface UserData {
  name?: string;
  email: string;
  password: string;
  role?: string;
}

export interface CampaignInputData {
  name: string;
  subject: string;
  message: string;
  recipients: string[];
  type: string;
  scheduleTime: Date;
}

export const validateUser = (user: UserData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string().min(5).max(255),
  });

  return schema.validate(user);
};

export const validateLogin = (user: UserData) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

export const validateCampaignDataInput = (campaign: CampaignInputData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    subject: Joi.string().min(3).max(200).required(),
    message: Joi.string().min(5).max(500).required(),
    recipients: Joi.array().items(Joi.string().required()).max(20),
    type: Joi.string().min(3).max(255).required(),
    scheduleTime: Joi.date().required(),
  });

  return schema.validate(campaign);
};
