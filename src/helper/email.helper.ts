import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { ENV_CONFIG } from "../config/env.config";
import { ICampaign } from "../types/campaign_data_type";

const mailerSend = new MailerSend({
  apiKey: ENV_CONFIG.MAILERSEND.API_KEY,
});

export const sendEmail = async (email: ICampaign) => {
  const emails: any = [];
  const sentFrom = new Sender(
    "c_manager@trial-351ndgw0jjx4zqx8.mlsender.net", // this is a trial domain provided by mailsender
    "Campaign Manager"
  );
  const subject = email.subject;
  const mailBody = email.message;

  email.recipients.forEach((recipient: string) => {
    emails.push(
      new EmailParams()
        .setFrom(sentFrom)
        .setTo([new Recipient(recipient)])
        .setSubject(subject)
        .setText(mailBody)
    );
  });

  await mailerSend.email.sendBulk(emails);
};
