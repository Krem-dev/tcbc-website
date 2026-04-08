"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";

interface Sermon {
  _id: string;
  title: string;
  speaker: string;
  date: string;
  series?: string;
  excerpt: string;
  videoUrl: string;
  thumbnail?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
  slug: {
    current: string;
  };
}

function getYouTubeThumbnail(url: string): string | null {
  try {
    // Handle embed URLs: youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (embedMatch) return `https://img.youtube.com/vi/${embedMatch[1]}/hqdefault.jpg`;
    // Handle watch URLs: youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`;
    // Handle short URLs: youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://img.youtube.com/vi/${shortMatch[1]}/hqdefault.jpg`;
  } catch {}
  return null;
}

export default function SermonsPage() {
  const [allowMotion, setAllowMotion] = useState(true);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 9;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch("/api/sermons");
        if (!response.ok) throw new Error("Failed to fetch sermons");
        const data = await response.json();
        setSermons(data || []);
      } catch (error) {
        console.error("Failed to load sermons:", error);
        setSermons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  const displaySermons = sermons;

  const allSeries = useMemo(() => {
    const names = displaySermons.map((s) => s.series).filter(Boolean) as string[];
    return Array.from(new Set(names)).sort();
  }, [displaySermons]);

  const filteredSermons = useMemo(() => {
    let result = displaySermons;
    if (seriesFilter) {
      result = result.filter((s) => s.series === seriesFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.speaker.toLowerCase().includes(q) ||
          (s.excerpt && s.excerpt.toLowerCase().includes(q))
      );
    }
    return result;
  }, [displaySermons, searchQuery, seriesFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSermons.length / PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedSermons = filteredSermons.slice(
    (safeCurrentPage - 1) * PER_PAGE,
    safeCurrentPage * PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSeriesChange = (value: string) => {
    setSeriesFilter(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative py-16 sm:py-24 bg-center bg-cover opacity-0 animate-fade-in"
        style={{ backgroundImage: "url('/bib-4.jpg')" }}
        aria-label="Sermons hero"
      >
        <div className="absolute inset-0 -z-0 bg-[#48007e]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-rise-delay">
            Recent Sermons
          </h1>

          <p className="font-aeonik text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 animate-rise-2">
            Listen to powerful messages from our pastors about faith, growth, and living out your faith in daily life.
          </p>

          <div className="w-20 sm:w-24 h-1 mx-auto bg-white animate-scale-x" />
        </div>
      </section>

      {/* Sermons */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, speaker..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48007e]/20 focus:border-[#48007e]/40 transition"
              />
            </div>
            <select
              value={seriesFilter}
              onChange={(e) => handleSeriesChange(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#48007e]/20 focus:border-[#48007e]/40 transition sm:w-52"
            >
              <option value="">All Series</option>
              {allSeries.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-400 mb-6">
            {filteredSermons.length} sermon{filteredSermons.length !== 1 ? "s" : ""}
            {searchQuery || seriesFilter ? " found" : ""}
          </p>

          {/* Sermon Cards */}
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-400">Loading sermons...</p>
            </div>
          ) : paginatedSermons.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No sermons match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {paginatedSermons.map((sermon) => (
                <a
                  key={sermon._id}
                  href={sermon.videoUrl?.replace('/embed/', '/watch?v=') || sermon.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={sermon.thumbnail?.asset?.url || (sermon.videoUrl ? getYouTubeThumbnail(sermon.videoUrl) : null) || "/bib-4.jpg"}
                      alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-[#48007e] fill-[#48007e] ml-0.5" />
                      </div>
                    </div>
                    {sermon.series && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/60 text-white text-[11px] font-medium rounded backdrop-blur-sm">
                        {sermon.series}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="font-satoshi text-[15px] font-semibold text-gray-900 group-hover:text-[#48007e] transition-colors line-clamp-2 leading-snug mb-1.5">
                    {sermon.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {sermon.speaker} &middot; {new Date(sermon.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </a>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
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
