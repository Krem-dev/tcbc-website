import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Note: This uses environment variables for credentials
// NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const client = projectId && dataset && token ? createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
}) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, category, request: prayerRequest, isConfidential } = body;

    // Validate required fields
    if (!name || !email || !category || !prayerRequest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If Sanity is not configured, just log the request
    if (!client) {
      console.log("Prayer request received (Sanity not configured):", {
        name,
        email,
        phone,
        category,
        prayerRequest,
        isConfidential,
        submittedAt: new Date().toISOString(),
      });
      return NextResponse.json(
        { success: true, message: "Prayer request received. Sanity CMS not configured yet." },
        { status: 201 }
      );
    }

    // Create prayer request document in Sanity
    const doc = {
      _type: "prayerRequest",
      name,
      email,
      phone: phone || "",
      category,
      request: prayerRequest,
      isConfidential,
      status: "new",
      submittedAt: new Date().toISOString(),
    };

    const result = await client.create(doc);

    return NextResponse.json(
      { success: true, id: result._id },
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
      console.warn("Sanity client not configured. Returning empty prayer requests.");
      return NextResponse.json([]);
    }

    const prayerRequests = await client.fetch(
      `*[_type == "prayerRequest"] | order(submittedAt desc) {
        _id,
        name,
        email,
        phone,
        category,
        request,
        isConfidential,
        status,
        submittedAt
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
