import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const client =
  projectId && dataset && token
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2024-01-01",
        token,
        useCdn: false,
      })
    : null;

export async function POST(request: NextRequest) {
  try {
    const { name, email, organization, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (client) {
      await client.create({
        _type: "contactSubmission",
        name,
        email,
        organization: organization || "",
        phone: phone || "",
        message,
        submittedAt: new Date().toISOString(),
        status: "new",
      });
    }

    // TODO: Add email notification when switching to Hostinger SMTP

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
