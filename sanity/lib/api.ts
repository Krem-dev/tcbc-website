import { sanityFetch } from "./client";
import {
  BLOG_QUERY,
  BLOG_BY_SLUG_QUERY,
  SERMONS_QUERY,
  SERMON_BY_SLUG_QUERY,
  EVENTS_QUERY,
  EVENTS_BY_DATE_QUERY,
  MINISTRIES_QUERY,
  PRAYER_REQUESTS_QUERY,
  PRAYER_REQUESTS_BY_STATUS_QUERY,
} from "./queries";

// Blog API
export async function getBlogs() {
  return sanityFetch({ query: BLOG_QUERY });
}

export async function getBlogBySlug(slug: string) {
  return sanityFetch({
    query: BLOG_BY_SLUG_QUERY,
    params: { slug },
  });
}

// Sermons API
export async function getSermons() {
  return sanityFetch({ query: SERMONS_QUERY });
}

export async function getSermonBySlug(slug: string) {
  return sanityFetch({
    query: SERMON_BY_SLUG_QUERY,
    params: { slug },
  });
}

// Events API
export async function getEvents() {
  return sanityFetch({ query: EVENTS_QUERY });
}

export async function getEventsByDateRange(startDate: string, endDate: string) {
  return sanityFetch({
    query: EVENTS_BY_DATE_QUERY,
    params: { startDate, endDate },
  });
}

// Ministries API
export async function getMinistries() {
  return sanityFetch({ query: MINISTRIES_QUERY });
}

// Prayer Requests API
export async function getPrayerRequests() {
  return sanityFetch({ query: PRAYER_REQUESTS_QUERY });
}

export async function getPrayerRequestsByStatus(status: string) {
  return sanityFetch({
    query: PRAYER_REQUESTS_BY_STATUS_QUERY,
    params: { status },
  });
}

// Submit Prayer Request
export async function submitPrayerRequest(data: {
  name: string;
  email: string;
  phone: string;
  category: string;
  request: string;
  isConfidential: boolean;
}) {
  try {
    const response = await fetch("/api/prayer-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit prayer request");
    }

    return await response.json();
  } catch (error) {
    console.error("Prayer request submission error:", error);
    throw error;
  }
}
