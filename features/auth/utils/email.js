import { sendMail } from "@/servers/email/servers/service";

export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

    // Email göndermek yerine konsola yazdır
    // console.log('========= ŞİFRE SIFIRLAMA LİNKİ =========');
    // console.log(resetLink);
    // console.log('=========================================');

    await sendMail({
      to: email,
      subject: "Şifre Sıfırlama Talebi",
      template: "passwordreset",
      props: { resetLink },
    });

    return true;
  } catch (error) {
    console.error("Hata:", error);
    return false;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    await sendMail({
      to: email,
      subject: "Hoş Geldiniz",
      template: "newusergreet",
      props: { username: name },
    });
  } catch (error) {
    console.error("Hata:", error);
    return false;
  }
};
