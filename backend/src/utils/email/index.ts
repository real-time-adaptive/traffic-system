import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || "";
if (!apiKey || apiKey.trim() === "") {
  console.warn("[Email] RESEND_API_KEY not set. Email sending will fail.");
}

const resend = new Resend(apiKey);

export type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export const sendEmail = async (opts: SendEmailOptions) => {
  const { to, subject, html, text } = opts;
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
