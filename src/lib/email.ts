import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER || "tcbcottawa@gmail.com";
const smtpPassword = process.env.SMTP_PASSWORD || "fbxw plwn juib atbn";
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
  console.log("[EMAIL] smtpUser:", smtpUser ? "SET" : "NOT SET");
  console.log("[EMAIL] smtpPassword:", smtpPassword ? "SET" : "NOT SET");
  console.log("[EMAIL] churchEmail:", churchEmail);

  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[EMAIL] Transporter is null — skipping send.");
    return false;
  }

  try {
    console.log("[EMAIL] Sending to:", to || churchEmail, "Subject:", subject);
    const result = await transporter.sendMail({
      from: smtpUser,
      to: to || churchEmail,
      subject,
      html,
      attachments,
    });
    console.log("[EMAIL] Sent successfully! Message ID:", result.messageId);
    return true;
  } catch (err) {
    console.error("[EMAIL] Send failed:", err);
    return false;
  }
}
