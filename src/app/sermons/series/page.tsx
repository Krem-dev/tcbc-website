"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

interface Series {
  _id: string;
  name: string;
  description: string;
  sermonCount: number;
}

export default function SermonSeriesPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch("/api/sermons");
        if (response.ok) {
          const data = await response.json();
          const seriesMap = new Map<string, Series>();
          
          data.forEach((sermon: any) => {
            if (sermon.series) {
              if (!seriesMap.has(sermon.series)) {
                seriesMap.set(sermon.series, {
                  _id: sermon.series,
                  name: sermon.series,
                  description: `A series of sermons on ${sermon.series}`,
                  sermonCount: 0,
                });
              }
              const s = seriesMap.get(sermon.series)!;
              s.sermonCount += 1;
            }
          });
          
          setSeries(Array.from(seriesMap.values()));
        }
      } catch (error) {
        console.error("Failed to fetch sermon series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#48007e]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/sermons"
            className="inline-flex items-center gap-2 text-[#48007e] hover:text-[#7c01cd] transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sermons
          </Link>
          
          <h1 className="font-satoshi text-4xl sm:text-5xl font-bold text-[#48007e] mb-4">
            Sermon Series
          </h1>
          <p className="font-aeonik text-lg text-gray-600">
            Explore our sermon series and dive deeper into God's Word
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading sermon series...</p>
            </div>
          ) : series.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No sermon series available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {series.map((s) => (
                <Link
                  key={s._id}
                  href={`/sermons?series=${encodeURIComponent(s.name)}`}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-[#48007e]/10 to-[#7c01cd]/10 rounded-2xl p-8 hover:shadow-lg transition-all border border-[#48007e]/20">
                    <h3 className="font-satoshi text-2xl font-bold text-[#48007e] mb-2 group-hover:text-[#7c01cd] transition">
                      {s.name}
                    </h3>
                    <p className="font-aeonik text-gray-600 mb-4">
                      {s.description}
                    </p>
                    <p className="font-aeonik text-sm text-[#48007e] font-semibold">
                      {s.sermonCount} {s.sermonCount === 1 ? "sermon" : "sermons"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
