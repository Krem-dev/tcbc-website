"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Play } from "lucide-react";
import Footer from "@/components/Footer";
import { dummySermons } from "@/lib/dummyData";
import { USE_DUMMY_DATA } from "@/lib/config";

interface Sermon {
  _id: string;
  title: string;
  speaker: string;
  date: string;
  series?: string;
  excerpt: string;
  videoUrl: string;
  thumbnail?: string;
  slug: {
    current: string;
  };
}

export default function SermonsPage() {
  const [allowMotion, setAllowMotion] = useState(true);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

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

  const fallbackSermons: Sermon[] = [
    {
      _id: "1",
      title: "The Foundation of Faith",
      speaker: "Pastor John",
      date: "2026-01-05",
      series: "Foundations",
      excerpt: "Discover what it means to build your life on the solid foundation of faith in Jesus Christ.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      slug: { current: "foundation-of-faith" },
    },
    {
      _id: "2",
      title: "Living in Victory",
      speaker: "Pastor Sarah",
      date: "2025-12-29",
      series: "Victory in Christ",
      excerpt: "Learn how to live victoriously through Christ in every circumstance of life.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      slug: { current: "living-in-victory" },
    },
    {
      _id: "3",
      title: "The Power of Prayer",
      speaker: "Pastor Michael",
      date: "2025-12-22",
      series: "Prayer",
      excerpt: "Unlock the transformative power of prayer and see God work in your life.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      slug: { current: "power-of-prayer" },
    },
    {
      _id: "4",
      title: "Grace Undeserved",
      speaker: "Pastor John",
      date: "2025-12-15",
      series: "Grace",
      excerpt: "Understand the amazing grace of God and how it transforms our lives.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      slug: { current: "grace-undeserved" },
    },
    {
      _id: "5",
      title: "Walking in the Light",
      speaker: "Pastor Sarah",
      date: "2025-12-08",
      series: "Light",
      excerpt: "Discover how to walk in God's light and reflect His love to the world.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      slug: { current: "walking-in-light" },
    },
    {
      _id: "6",
      title: "Love Never Fails",
      speaker: "Pastor Michael",
      date: "2025-12-01",
      series: "Love",
      excerpt: "Explore the greatest commandment and how love is the foundation of all we do.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      slug: { current: "love-never-fails" },
    },
  ];

  const displaySermons = sermons.length > 0 ? sermons : fallbackSermons;

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

      {/* Sermons Grid */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h2 className="font-satoshi text-2xl sm:text-3xl font-bold text-[#48007e] mb-2 sm:mb-4">
              All Sermons
            </h2>
            <p className="font-aeonik text-sm sm:text-base text-gray-600">
              Explore our latest sermons and find messages that speak to your heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displaySermons.map((sermon) => (
              <div
                key={sermon._id}
                className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Video Thumbnail */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-[#48007e]/30 to-[#7c01cd]/30 flex items-center justify-center overflow-hidden group-hover:brightness-110 transition-all">
                  <Image
                    src={sermon.thumbnail || "/bib-4.jpg"}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-[#48007e] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-5 sm:w-6 h-5 sm:h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex-grow flex flex-col">
                  {sermon.series && (
                    <span className="inline-block w-fit px-2 sm:px-3 py-0.5 sm:py-1 bg-[#7c01cd]/15 text-[#48007e] text-xs font-semibold rounded-full mb-2 sm:mb-3">
                      {sermon.series}
                    </span>
                  )}

                  <h3 className="font-satoshi text-base sm:text-lg font-bold text-[#48007e] group-hover:text-[#7c01cd] transition-colors mb-2 sm:mb-3">
                    {sermon.title}
                  </h3>

                  <p className="font-aeonik text-gray-600 text-xs sm:text-sm flex-grow mb-3 sm:mb-4">
                    {sermon.excerpt}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 font-aeonik border-t border-gray-200 pt-3 sm:pt-4">
                    <div className="flex items-center gap-2">
                      <User className="w-3 sm:w-4 h-3 sm:h-4 text-[#48007e]" />
                      <span>{sermon.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-[#48007e]" />
                      <span>{new Date(sermon.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Watch Button */}
                  <button className="mt-3 sm:mt-4 w-full py-2 bg-[#48007e] text-white font-semibold text-sm rounded-lg hover:bg-[#7c01cd] transition-colors flex items-center justify-center gap-2">
                    <Play className="w-3 sm:w-4 h-3 sm:h-4 fill-white" />
                    Watch Sermon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
