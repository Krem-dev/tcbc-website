import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
const churchEmail = process.env.CHURCH_EMAIL || "tcbcottawa@gmail.com";

function createTransporter() {
  if (!smtpUser || !smtpPassword) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });
}

export async function sendEmail({
  subject,
  html,
  to,
  attachments,
}: {
  subject: string;
  html: string;
  to?: string;
  attachments?: { filename: string; content: Buffer; contentType: string }[];
}) {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("Email not configured — skipping send.");
    return false;
  }

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: to || churchEmail,
      subject,
      html,
      attachments,
    });
    return true;
  } catch (err) {
    console.error("[EMAIL] Send failed:", err);
    return false;
  }
}
