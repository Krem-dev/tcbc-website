"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

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

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/blogs?slug=${slug}`);
        if (!response.ok) throw new Error("Failed to fetch article");
        const data = await response.json();
        
        if (data && data.length > 0) {
          setArticle(data[0]);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to load article:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#48007e]/20 border-t-[#48007e] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </main>
    );
  }

  if (notFound || !article) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="font-satoshi text-4xl font-bold text-[#48007e] mb-4">
            Article Not Found
          </h1>
          <p className="font-aeonik text-gray-600 mb-8">
            Sorry, we couldn't find the article you're looking for.
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

  const imageUrl = article.image?.asset?.url || "/bib-4.jpg";
  const publishDate = new Date(article.publishedAt).toLocaleDateString();

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-96 bg-center bg-cover overflow-hidden" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#48007e]/80 via-[#48007e]/70 to-[#7c01cd]/75"></div>
        
        <div className="relative h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 font-aeonik"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <h1 className="font-satoshi text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 font-aeonik">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{publishDate}</span>
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
                {article.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none text-left">
            <div className="space-y-6 font-aeonik text-gray-700 leading-relaxed">
              {article.content && article.content.length > 0 ? (
                article.content.map((block: any, idx: number) => {
                  if (block._type === "block") {
                    return (
                      <p key={idx} className="text-lg leading-8 text-gray-700">
                        {block.children?.map((child: any, i: number) => (
                          <span key={i}>
                            {child.marks?.includes("strong") ? (
                              <strong className="text-[#48007e] font-bold">{child.text}</strong>
                            ) : (
                              child.text
                            )}
                          </span>
                        ))}
                      </p>
                    );
                  }
                  if (block._type === "image") {
                    return (
                      <div key={idx} className="my-8">
                        <img 
                          src={block.asset?.url} 
                          alt={block.alt || "Article image"}
                          className="w-full rounded-lg"
                        />
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <p className="text-gray-600">No content available</p>
              )}
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}