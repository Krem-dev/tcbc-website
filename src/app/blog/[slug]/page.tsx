import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { getBlogBySlug } from "../../../../sanity/lib/api";
import BlogContent from "./BlogContent";

interface Article {
  _id: string;
  title: string;
  author: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  image?: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  content: any[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = (await getBlogBySlug(slug)) as Article | null;

  if (!article) {
    return {
      title: "Article Not Found | TCBC Ottawa",
      description: "The article you are looking for could not be found.",
    };
  }

  const imageUrl = article.image?.asset?.url || "/bib-4.jpg";
  const description = article.excerpt || `Read ${article.title} on TCBC Ottawa.`;
  const url = `https://tcbcottawa.org/blog/${article.slug.current}`;

  return {
    title: `${article.title} | TCBC Ottawa`,
    description,
    openGraph: {
      title: article.title,
      description,
      url,
      siteName: "The Chosen Bible Church",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = (await getBlogBySlug(slug)) as Article | null;

  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="font-satoshi text-4xl font-bold text-[#48007e] mb-4">
            Article Not Found
          </h1>
          <p className="font-aeonik text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the article you&apos;re looking for.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#48007e] font-semibold hover:text-[#7c01cd] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return <BlogContent article={article} />;
}
