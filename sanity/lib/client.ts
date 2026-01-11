import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = projectId && dataset ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
}) : null;

export const sanityFetch = async ({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}) => {
  if (!client) {
    console.warn("Sanity client not configured. Using fallback data.");
    return [];
  }
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
};
