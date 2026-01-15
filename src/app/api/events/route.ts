import { NextResponse } from "next/server";
import { getEvents } from "../../../../sanity/lib/api";

export async function GET() {
  try {
    const events = await getEvents();
    console.log("Events from Sanity:", events);
    console.log("Events count:", events?.length || 0);
    return NextResponse.json(events || []);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
