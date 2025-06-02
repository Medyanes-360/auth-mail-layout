import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

    // Email göndermek yerine konsola yazdır
    console.log('========= ŞİFRE SIFIRLAMA LİNKİ =========');
    console.log(resetLink);
    console.log('=========================================');

    return true;
  } catch (error) {
    console.error("Hata:", error);
    return false;
  }
};
