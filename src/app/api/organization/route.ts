import { NextResponse } from "next/server";
import { sanityFetch } from "../../../../sanity/lib/client";

export async function GET() {
  try {
    const organization = await sanityFetch({
      query: `*[_type == "organization"][0] {
        _id,
        name,
        description,
        email,
        phone,
        address,
        hours,
        socialLinks,
        mission,
        vision
      }`,
    });
    return NextResponse.json(organization || {});
  } catch (error) {
    console.error("Failed to fetch organization:", error);
    return NextResponse.json(
      { error: "Failed to fetch organization" },
      { status: 500 }
    );
  }
}
