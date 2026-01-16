import { NextResponse } from "next/server";
import { getBlogs } from "../../../../sanity/lib/api";
import { sanityFetch } from "../../../../sanity/lib/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Fetch specific blog by slug
      const blog = await sanityFetch({
        query: `*[_type == "blog" && slug.current == $slug] {
          _id,
          title,
          author,
          publishedAt,
          category,
          excerpt,
          image {
            asset-> {
              _id,
              url
            },
            alt
          },
          slug,
          content
        }`,
        params: { slug }
      });
      return NextResponse.json(blog);
    } else {
      // Fetch all blogs
      const blogs = await getBlogs();
      return NextResponse.json(blogs);
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
