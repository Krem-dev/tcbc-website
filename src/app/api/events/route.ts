import { NextResponse } from "next/server";
import { getEvents } from "../../../../sanity/lib/api";
import { sanityFetch } from "../../../../sanity/lib/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ministry = searchParams.get('ministry');

    if (ministry) {
      // Fetch events filtered by ministry
      const events = await sanityFetch({
        query: `*[_type == "event" && ministry->title == $ministry] | order(startDate asc) {
          _id,
          title,
          slug,
          description,
          startDate,
          endDate,
          location,
          category,
          image {
            asset-> {
              _id,
              url
            },
            alt
          },
          ministry-> {
            _id,
            title
          },
          isFeatured
        }`,
        params: { ministry }
      });
      return NextResponse.json(events || []);
    } else {
      // Fetch all events
      const events = await getEvents();
      console.log("Events from Sanity:", events);
      console.log("Events count:", events?.length || 0);
      return NextResponse.json(events || []);
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
