import { createTransport } from "nodemailer";

const config = {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    email: {
        from: process.env.EMAIL_FROM,
    },
};

export const transporter = createTransport(config);