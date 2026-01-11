import { NextResponse } from "next/server";
import { getMinistries } from "../../../../sanity/lib/api";

export async function GET() {
  try {
    const ministries = await getMinistries();
    return NextResponse.json(ministries);
  } catch (error) {
    console.error("Failed to fetch ministries:", error);
    return NextResponse.json(
      { error: "Failed to fetch ministries" },
      { status: 500 }
    );
  }
}
