"use server";

import { renderTemplate } from "../templates/index.js";
import { transporter } from "./nodemailer.js";

export async function sendMail({ to, subject, template, props = {} }) {
  try {
    const emailContent = await renderTemplate(template, props);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: emailContent,
    });
  } catch (err) {
    throw new Error(
      `"${template}" adlı template bulunamadı veya gönderim hatası: ${err.message}`
    );
  }
}
