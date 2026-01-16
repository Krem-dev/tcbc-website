import { NextResponse } from "next/server";
import { sanityFetch } from "../../../../sanity/lib/client";

export async function GET() {
  try {
    const homepage = await sanityFetch({
      query: `*[_type == "homepage"][0] {
        _id,
        title,
        heroSection {
          mainHeading,
          subHeading,
          backgroundImage {
            asset-> {
              _id,
              url
            },
            alt
          },
          ctaButtons[] {
            text,
            link,
            style
          }
        },
        pastorWelcome {
          heading,
          pastorName,
          pastorImage {
            asset-> {
              _id,
              url
            },
            alt
          },
          welcomeMessage,
          signature {
            asset-> {
              _id,
              url
            },
            alt
          }
        },
        upcomingEvents {
          heading,
          description,
          featuredEvents[]-> {
            _id,
            title,
            startDate,
            endDate,
            location,
            description,
            image {
              asset-> {
                _id,
                url
              },
              alt
            },
            category
          },
          customEvents[] {
            title,
            date,
            location,
            description,
            poster {
              asset-> {
                _id,
                url
              },
              alt
            },
            link
          },
          viewAllLink
        },
        ministriesSection {
          heading,
          description,
          featuredMinistries[]-> {
            _id,
            name,
            description,
            image,
            leader
          }
        },
        recentSermons {
          heading,
          description,
          featuredSermons[]-> {
            _id,
            title,
            speaker,
            date,
            scripture,
            audioUrl,
            videoUrl,
            image
          }
        },
        testimonials {
          heading,
          testimonialsList[] {
            name,
            role,
            image,
            testimonial,
            rating
          }
        },
        contactSection {
          heading,
          description,
          serviceSchedule[] {
            day,
            time,
            service
          },
          quickActions[] {
            text,
            link,
            icon
          }
        }
      }`
    });

    return NextResponse.json(homepage || {});
  } catch (error) {
    console.error("Failed to fetch homepage content:", error);
    return NextResponse.json(
      { error: "Failed to fetch homepage content" },
      { status: 500 }
    );
  }
}
