import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { sendEmail } from "@/lib/email";

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
    const body = await request.json();
    const {
      name,
      email,
      phone,
      category,
      request: prayerRequest,
      isConfidential,
    } = body;

    if (!name || !email || !category || !prayerRequest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!client) {
      console.warn("Sanity not configured — prayer request logged only.");
      return NextResponse.json(
        { success: true, message: "Prayer request received" },
        { status: 201 }
      );
    }

    await client.create({
      _type: "prayerRequest",
      name,
      email,
      phone: phone || "",
      category,
      request: prayerRequest,
      isConfidential,
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    // Send email notification
    await sendEmail({
      subject: `New Prayer Request from ${name}`,
      html: `
        <h2>New Prayer Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Confidential:</strong> ${isConfidential ? "Yes" : "No"}</p>
        <hr />
        <p>${prayerRequest.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Prayer request submitted" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Prayer request submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit prayer request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!client) {
      return NextResponse.json([]);
    }

    const prayerRequests = await client.fetch(
      `*[_type == "prayerRequest"] | order(submittedAt desc) {
        _id, name, email, phone, category, request,
        isConfidential, status, submittedAt
      }`
    );

    return NextResponse.json(prayerRequests);
  } catch (error) {
    console.error("Prayer requests fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch prayer requests" },
      { status: 500 }
    );
  }
}
