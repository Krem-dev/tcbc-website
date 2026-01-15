"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Search } from "lucide-react";
import Footer from "@/components/Footer";
import { dummyBlogs } from "@/lib/dummyData";
import { USE_DUMMY_DATA } from "@/lib/config";

interface BlogArticle {
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
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [allowMotion, setAllowMotion] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setArticles(data || []);
      } catch (error) {
        console.error("Failed to load blogs:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Image Background */}
      <section
        className="relative py-24 sm:py-32 bg-center bg-cover opacity-0 animate-fade-in overflow-hidden"
        style={{ backgroundImage: "url('/bib-4.jpg')" }}
        aria-label="Blog hero"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#48007e]/85 via-[#48007e]/70 to-[#7c01cd]/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-rise-delay">
            Blog
          </h1>

          <p className="font-aeonik text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 animate-rise-2">
            Insights, stories, and reflections from our community members on faith, growth, and spiritual journey.
          </p>

          <div className="w-20 sm:w-24 h-1 mx-auto bg-white animate-scale-x" />
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-8 sm:py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#48007e] w-4 sm:w-5 h-4 sm:h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-0 focus:border-[#48007e] font-aeonik text-sm sm:text-base text-gray-800 placeholder-gray-400 transition-colors duration-300"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-gray-600 font-aeonik">
                Found {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Articles Grid - StoriesSection Style */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article._id}
                className="group cursor-pointer"
              >
                {/* Article Image Card */}
                <figure className="relative h-48 sm:h-64 overflow-hidden rounded-lg sm:rounded-xl shadow-lg mb-4 sm:mb-6 group">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${article.image?.asset?.url || "/bib-4.jpg"}')`
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[#48007e]/40 to-[#7c01cd]/40" />
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </figure>

                {/* Article Content */}
                <div>
                  {/* Category Badge */}
                  <div className="mb-2 sm:mb-3">
                    <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-[#7c01cd]/15 text-[#48007e] text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-satoshi text-lg sm:text-xl font-bold text-[#48007e] mb-2 sm:mb-3 group-hover:text-[#7c01cd] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-aeonik text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500 font-aeonik">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${article.slug.current}`}
                    className="inline-block mt-4 text-[#48007e] font-semibold hover:text-[#7c01cd] transition-colors group/link"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* No Articles Message */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="font-aeonik text-gray-600 text-lg">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
