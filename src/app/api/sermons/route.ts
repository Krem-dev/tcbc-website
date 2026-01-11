import { NextResponse } from "next/server";
import { getSermons } from "../../../../sanity/lib/api";

export async function GET() {
  try {
    const sermons = await getSermons();
    return NextResponse.json(sermons);
  } catch (error) {
    console.error("Failed to fetch sermons:", error);
    return NextResponse.json(
      { error: "Failed to fetch sermons" },
      { status: 500 }
    );
  }
}
