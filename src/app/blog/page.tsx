"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";

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

const PER_PAGE = 9;

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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

  const allCategories = useMemo(() => {
    const cats = articles.map((a) => a.category).filter(Boolean);
    return Array.from(new Set(cats)).sort();
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (categoryFilter) {
      result = result.filter((a) => a.category === categoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt?.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [articles, searchQuery, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedArticles = filteredArticles.slice(
    (safeCurrentPage - 1) * PER_PAGE,
    safeCurrentPage * PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative py-24 sm:py-32 bg-center bg-cover opacity-0 animate-fade-in overflow-hidden"
        style={{ backgroundImage: "url('/bib-4.jpg')" }}
        aria-label="Blog hero"
      >
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

      {/* Blog Content */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48007e]/20 focus:border-[#48007e]/40 transition"
              />
            </div>
            {allCategories.length > 1 && (
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#48007e]/20 focus:border-[#48007e]/40 transition sm:w-52"
              >
                <option value="">All Categories</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-400 mb-6">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
            {searchQuery || categoryFilter ? " found" : ""}
          </p>

          {/* Articles Grid */}
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-400">Loading articles...</p>
            </div>
          ) : paginatedArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No articles match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {paginatedArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/blog/${article.slug.current}`}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <Image
                      src={article.image?.asset?.url || "/bib-4.jpg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {article.category && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/60 text-white text-[11px] font-medium rounded backdrop-blur-sm">
                        {article.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="font-satoshi text-[15px] font-semibold text-gray-900 group-hover:text-[#48007e] transition-colors line-clamp-2 leading-snug mb-1.5">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-gray-400">
                    {article.author} &middot; {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {safeCurrentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
